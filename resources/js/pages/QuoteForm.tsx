import React, { useState } from 'react';
import axios from 'axios';


const QuoteForm = () => {
    const [zipCode, setZipCode] = useState('');
    const [originAddress, setOriginAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [distance, setDistance] = useState(null);
    const [zoneStatus, setZoneStatus] = useState(null);
    const [mileageFee, setMileageFee] = useState(null);

    const handleCheckZone = async () => {
        try {
            const response = await axios.post('/api/check-zone', { zip: zipCode });
            setZoneStatus(response.data);
        } catch (error) {
            console.error('Error checking zone:', error);
        }
    };

    const handleGetDistance = async () => {
        try {
            const response = await axios.post('/api/distance', {
                origin_address: originAddress,
                destination_address: destinationAddress
            });
            setDistance(response.data.mileage);
        } catch (error) {
            console.error('Error fetching distance:', error);
        }
    };

    const handleGetMileageFee = async () => {
        try {
            const response = await axios.post('/api/mileage-fee', {
                mileage_contracted: true,
                distance: distance,
                miles_included: 50,
                mileage_rate: 2.25
            });
            setMileageFee(response.data.fee);
        } catch (error) {
            console.error('Error calculating fee:', error);
        }
    };

    return (
        <div className="p-4 border rounded shadow-md max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Quote Form</h2>

            <div className="mb-4">
                <label className="block mb-1">ZIP Code:</label>
                <input
                    type="text"
                    className="w-full p-2 border"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />
                <button onClick={handleCheckZone} className="mt-2 px-4 py-2 bg-blue-500 text-white">
                    Check Zones
                </button>
                {zoneStatus && (
                    <div className="mt-2 text-sm text-gray-700">
                        Reservation: {zoneStatus.reservation ? 'Yes' : 'No'}<br />
                        Military Base: {zoneStatus.military_base ? 'Yes' : 'No'}
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Origin Address:</label>
                <input
                    type="text"
                    className="w-full p-2 border"
                    value={originAddress}
                    onChange={(e) => setOriginAddress(e.target.value)}
                />
                <label className="block mb-1 mt-2">Destination Address:</label>
                <input
                    type="text"
                    className="w-full p-2 border"
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                />
                <button onClick={handleGetDistance} className="mt-2 px-4 py-2 bg-green-500 text-white">
                    Get Distance
                </button>
                {distance !== null && (
                    <div className="mt-2 text-sm text-gray-700">Distance: {distance} miles</div>
                )}
            </div>

            <div className="mb-4">
                <button onClick={handleGetMileageFee} className="px-4 py-2 bg-purple-600 text-white">
                    Get Mileage Fee
                </button>
                {mileageFee !== null && (
                    <div className="mt-2 text-sm text-gray-700">Mileage Fee: ${mileageFee.toFixed(2)}</div>
                )}
            </div>
        </div>
    );
};

export default QuoteForm;
