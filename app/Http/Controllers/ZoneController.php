<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use geoPHP;

class ZoneController extends Controller
{
    // public function check(Request $request)
    // {
    //     ini_set('memory_limit', '1000M');
    //     $zipcode = $request->input('zipCode');
    //     // $zipPolygons = \geoPHP::load('/app/private/geojson/zipcodes.geojson');
    //     // dd($zipcode);
    //     try {
    //         $zipGeo = $this->loadGeoJSON('geojson/zipcodes.geojson');
    //         dd($zipGeo);
    //         $resGeo = $this->loadGeoJSON('reservation.geojson');
    //         dd($resGeo);
    //         $milGeo = $this->loadGeoJSON('military.geojson');
    //         dd($milGeo);
    //         // $matchingZip = collect($zipGeo['features'])->first(function ($feature) use ($zipcode) {
    //         //     return $feature['properties']['ZCTA5CE20'] === $zipcode;
    //         // });
    //         $matchingZip = collect($zipGeo['features'])->firstWhere(
    //             fn($f) => $f['properties']['ZCTA5CE20'] == $zipCode
    //         );
    //         dd($matchingZip);

    //         if (!$matchingZip) {
    //             return response()->json([
    //                 'error' => "ZIP code not found in shapefile.",
    //                 'zipCode' => $zipcode
    //             ], 404);
    //         }

    //         $zipPolygon = geoPHP::load(json_encode($matchingZip['geometry']), 'json');
    //         dd($zipPolygon);

    //         $isTribal = false;
    //         foreach ($resGeo['features'] as $feature) {
    //             $polygon = geoPHP::load(json_encode($feature['geometry']), 'json');
    //             if ($zipPolygon->intersects($polygon)) {
    //                 $isTribal = true;
    //                 break;
    //             }
    //         }

    //         $isMilitary = false;
    //         foreach ($milGeo['features'] as $feature) {
    //             $polygon = geoPHP::load(json_encode($feature['geometry']), 'json');
    //             if ($zipPolygon->intersects($polygon)) {
    //                 $isMilitary = true;
    //                 break;
    //             }
    //         }

    //         // Rule: military overrides reservation
    //         if ($isMilitary) {
    //             $isTribal = false;
    //         }

    //         // save 2 DB
    //         DB::table('zone_check')->insert([
    //             'zip_code' => $zipcode,
    //             'is_reservation' => $isTribal,
    //             'is_military' => $isMilitary,
    //         ]);

    //         DB::table('from_client_search')
    //             ->where('location', $zipcode)
    //             ->update([
    //                 'reservation' => $isTribal,
    //                 'military_base' => $isMilitary,
    //             ]);

    //         return response()->json([
    //             'zip' => $zipcode,
    //             'isTribal' => $isTribal,
    //             'isMilitary' => $isMilitary,
    //             'message' => 'Result saved to DB',
    //         ]);
    //     } catch (\Exception $e) {
    //         \Log::error('Zone Check Error: ' . $e->getMessage());
    //         // \Log::error('Stack trace: ' . $e->getTraceAsString());
    //         return response()->json([
    //             'error' => 'Internal Server Error',
    //             'details' => $e->getMessage(),
    //         ], 500);
    //     }
    // }

    // private function loadGeoJSON($path)
    // {
    //     // if (!Storage::exists($path)) {
    //     //     throw new \Exception("GeoJSON file not found at: " . $path);
    //     // }
    //     // return json_decode(Storage::get($path), true);

    //     // $zipPath = Storage::path($path);
    //     // dd($zipPath);
    //     // if ($zipFile = Storage::exists($path)) {
    //     //     // dd($zipFile);
    //     //     return json_decode(Storage::get($path), true);
    //     // }

    //     // throw new \Exception('GeoJSON file not found at: ' . $path);

    //     // return json_decode($zipPath::get($path), true);

    //     if (!Storage::exists($path)) {
    //         throw new \Exception("GeoJSON file not found at: " . $path);
    //     }

    //     return json_decode(Storage::get($path), true);
    // }


     public function check(Request $request)
    {
        ini_set('memory_limit', '1000M');
        $zipCode = $request->input('zipCode');

        try {
            $zipGeo = $this->loadGeoJSON('geojson/zipcodes.geojson');
            $resGeo = $this->loadGeoJSON('geojson/reservation.geojson');
            $milGeo = $this->loadGeoJSON('geojson/military.geojson');

            dd($zipGeo);
            // Find matching ZIP
            $matchingZip = collect($zipGeo['features'])->firstWhere(
                fn($f) => $f['properties']['ZCTA5CE20'] == $zipCode
            );

            if (!$matchingZip) {
                return response()->json(['error' => 'ZIP not found'], 404);
            }

            $zipPolygon = geoPHP::load(json_encode($matchingZip['geometry']), 'json');

            $isTribal = false;
            foreach ($resGeo['features'] as $feature) {
                $polygon = geoPHP::load(json_encode($feature['geometry']), 'json');
                if ($zipPolygon->intersects($polygon)) {
                    $isTribal = true;
                    break;
                }
            }

            $isMilitary = false;
            foreach ($milGeo['features'] as $feature) {
                $polygon = geoPHP::load(json_encode($feature['geometry']), 'json');
                if ($zipPolygon->intersects($polygon)) {
                    $isMilitary = true;
                    break;
                }
            }

            // Rule: military overrides tribal
            if ($isMilitary) {
                $isTribal = false;
            }

            // Save to DB
            DB::table('zone_check')->insert([
                'zip_code' => $zipCode,
                'is_tribal' => $isTribal,
                'is_military' => $isMilitary,
            ]);

            DB::table('from_client_search')
                ->where('location', $zipCode)
                ->update([
                    'reservation' => $isTribal,
                    'military_base' => $isMilitary,
                ]);

            return response()->json([
                'zip' => $zipCode,
                'isTribal' => $isTribal,
                'isMilitary' => $isMilitary,
                'message' => 'Result saved to database',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    public function testzip()
    {
        // return json_decode(Storage::get($path), true);
        // try {
        //     $fullPath = storage_path('app/'. $path);

        //     if (!file_exists($fullPath)) {
        //         throw new \Exception("GeoJSON file not found: " . $fullPath);
        //     }

        //     return json_decode(file_get_contents($fullPath), true);
        // } catch (\E  ception $e) {
        //     throw new \Exception('Error: '. $e->getMessage());
        // }
        ini_set('memory_limit', '512M');
        // $raw = Storage::get('/zipcodes.geojson');
        $raw = Storage::get('/geojson/zipcodes/zipcodes.geojson');
        $decoded = json_decode($raw, true);
        // dd($raw);
        dd($decoded);
        // print_r($raw);

        // dd([
        //     'valid_json' => $decoded !== null,
        //     'features_count' => isset($decoded['features']) ? count($decoded['features']) : 0,
        //     'first_feature_sample' => $decoded['features'][0]['properties'] ?? 'No features',
        //     'json_error' => json_last_error(),
        // ]);
    }
}