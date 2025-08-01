import * as turf from '@turf/turf';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2/promise';
import shapefile from 'shapefile';

const app = express();
const PORT = 8888;

dotenv.config();

// MySQL Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.getConnection()
    .then((connection) => {
        console.log('Connected to database');
        connection.release();
    })
    .catch((err) => {
        console.log('Error connecting to database:', err);
    });

console.log(db);

app.use(cors());
app.use(express.json());

// Load shapefile and convert to GeoJSON
async function loadShapefile(path) {
    try {
        const geoJson = await shapefile.read(path);
        return geoJson;
    } catch (error) {
        console.error(`Failed to load shapefile at ${path}:`, error);
        throw error;
    }
}

// Normalize polygon geometry
function normalizePolygon(geometry) {
    if (geometry.type === 'MultiPolygon') {
        return turf.multiPolygon(geometry.coordinates);
    }
    return turf.polygon(geometry.coordinates);
}

// Check if ZIP overlaps reservation/military zone
async function checkZone(zipCode) {
    try {
        const reservations = await loadShapefile('./geojson/reservation/tl_2024_us_aiannh.shp');
        const militaryZones = await loadShapefile('./geojson/military/tl_2024_us_mil.shp');
        const zipCodes = await loadShapefile('./geojson/zipcodes/tl_2024_us_zcta520.shp');

        const matchingZipCode = zipCodes.features.find((feature) => feature.properties.ZCTA5CE20 === zipCode);

        const zipPolygon = normalizePolygon(matchingZipCode.geometry);
        let isTribal = false;
        let isMilitary = false;

        for (const resFeature of reservations.features) {
            if (turf.booleanIntersects(zipPolygon, normalizePolygon(resFeature.geometry))) {
                isTribal = true;
                break;
            }
        }

        for (const milFeature of militaryZones.features) {
            if (turf.booleanIntersects(zipPolygon, normalizePolygon(milFeature.geometry))) {
                isMilitary = true;
                break;
            }
        }

        if (isMilitary) isTribal = false;

        return { zip: zipCode, isTribal, isMilitary };
    } catch (error) {
        console.error('Error in checkZone:', error);
        throw error;
    }
}

// Zone check endpoint
app.post('/check-zone', async (req, res) => {
    const { zipCode } = req.body;

    try {
        const result = await checkZone(zipCode);
        console.log(result);
        await db.query(`INSERT INTO zone_checks (zip_code, is_tribal, is_military) VALUES (?, ?, ?)`, [
            result.zip,
            result.isTribal,
            result.isMilitary,
        ]);

        // // Save reservation & military base data into from_client_search
        // await db.query(`UPDATE from_client_search SET reservation = ?, military_base = ? WHERE location = ?`, [
        //     result.isTribal,
        //     result.isMilitary,
        //     zipCode,
        // ]);

        console.log('tribal', result.isTribal);
        console.log('zip Code', zipCode);
        console.log('Rows affected: ', result.affectedRows);
        res.json({ ...result, message: 'Result saved to database' });
    } catch (error) {
        console.error('Error in /check-zone:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});
