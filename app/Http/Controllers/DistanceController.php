<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class DistanceController extends Controller
{
     public function getDistance(Request $request)
    {
        $destination = $request->query('destination');

        if (!$destination) {
            return response()->json(['error' => 'Destination is required'], 400);
        }
        // add zipcode if there are any new branch location
        $origins = implode('|', [
            '87107', '88101', '80216', '87401', '87301', '86025',
            '88001', '55104', '59101', '85022', '88203', '85714', '98001'
        ]);

        $apiKey = config('services.google_maps.key');
        $url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={$origins}&destinations={$destination}&key={$apiKey}";

        try {
            $response = Http::get($url);
            $data = $response->json();

            if ($data['status'] !== 'OK') {
                 return response()->json(['error' => $data['error_message'] ?? 'Google API Error'], 500);
            }

            $results = collect($data['rows'])->map(function ($row, $index) use ($data) {
                $distanceText = $row['elements'][0]['distance']['text'] ?? 'N/A';
                $durationText = $row['elements'][0]['duration']['text'] ?? 'N/A';
                $numericDistance = floatval(str_replace(',', '',preg_replace('/[^0-9.]/', '', $distanceText)));

                return [
                    'origin_address' => $data['origin_addresses'][$index],
                    'destination_address' => $data['destination_addresses'][0],
                    'distance' => $distanceText,
                    'duration' => $durationText,
                    'numeric_distance' => $numericDistance,
                ];
            });

            $nearest = $results->sortBy('numeric_distance')->first();

            // Parse city/state/zip from destination address
            $destinationParts = explode(', ', $nearest['destination_address']);
            $city = $destinationParts[0] ?? null;
            $stateZip = explode(' ', $destinationParts[1] ?? '');
            $state = $stateZip[0] ?? null;
            $zip = $stateZip[1] ?? null;

            // save to quote table
            DB::table('distances')->insert([
                'origin_address' => $nearest['origin_address'],
                'destination_city' => $city,
                'destination_state' => $state,
                'destination_zip' => $zip,
                'destination_address' => $nearest['destination_address'],
                'distance' => $nearest['distance'],
                'duration' => $nearest['duration'],
            ]);

            // save/update branch address in from_client_search
            // DB::table('from_client_search')->updateOrInsert(
            //     ['branch_address' => $zip],
            //     ['branch_address' => $zip]
            // );

            return response()->json([
                'message' => 'Nearest location saved successfully',
                'nearest' => $nearest,
                'results' => $results,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }
}