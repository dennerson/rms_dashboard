<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;


class QuoteController extends Controller
{
    // public function getDistance(Request $request)
    // {
    //     $destination = $request->query('destination');

    //     if (!$destination) {
    //         return response()->json(['error' => 'Destination is required'], 400);
    //     }

    //     $origins = implode('|', [
    //         '87107', '88101', '80216', '87401', '87301', '86025',
    //         '88001', '55104', '59101', '85022', '88203', '85714', '98001'
    //     ]);

    //     $apiKey = config('services.google_maps.key');
    //     $url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={$origins}&destinations={$destination}&key={$apiKey}";

    //     // $response = Http::get($url);

    //     // if (!$response->ok()) {
    //     //     return response()->json(['error' => 'Google API Error'], 500);
    //     // }

    //     // $data = $response->json();

    //     // return response()->json([
    //     //     'message' => 'success',
    //     //     'results' => $data,
    //     // ]);

    //     try {
    //         $response = Http::get($url);
    //         $data = $response->json();
    //     //    dd($data);

    //         if ($data['status'] !== 'OK') {
    //             return response()->json(['error' => $data['error_message'] ?? 'Google API Error'], 500);
    //         }

    //         $results = collect($data['rows'])->map(function ($row, $index) use ($data) {
    //             $distanceText = $row['elements'][0]['distance']['text'] ?? 'N/A';
    //             $durationText = $row['elements'][0]['duration']['text'] ?? 'N/A';
    //             $numericDistance = floatval(preg_replace('/[^0-9]/', '', $distanceText));

    //             return [
    //                 'origin_address' => $data['origin_addresses'][$index],
    //                 'destination_address' => $data['destination_addresses'][0],
    //                 'distance' => $distanceText,
    //                 'duration' => $durationText,
    //                 'numeric_distance' => $numericDistance,
    //             ];
    //         });
    //         // dd($results);

    //         $nearest = $results->sortBy('numeric_distance')->first();
    //         dd($nearest);

    //         // Parse city/state/zip from destination address
    //         $destinationParts = explode(', ', $nearest['destination_address']);
    //         $city = $destinationParts[0] ?? null;
    //         $stateZip = explode(' ', $destinationParts[1] ?? '');
    //         $state = $stateZip[0] ?? null;
    //         $zip = $stateZip[1] ?? null;

    //         // save to quote table
    //         DB::table('quote')->insert([
    //             'origin_address' => $nearest['origin_address'],
    //             'destination_city' => $city,
    //             'destination_state' => $state,
    //             'destination_zip' => $zip,
    //             'destination_address' => $nearest['destination_address'],
    //             'distance' => $nearest['distance'],
    //             'duration' => $nearest['duration'],
    //         ]);

    //         // save/update branch address in from_client_search
    //         // DB::table('from_client_search')->updateOrInsert(
    //         //     ['branch_address' => $zip],
    //         //     ['branch_address' => $zip]
    //         // );

    //         return response()->json([
    //             'message' => 'Nearest location saved successfully',
    //             'nearest' => $nearest,
    //             'results' => $results,
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Internal server error'], 500);
    //     }
    // }

    // public function mileageFee(Request $request)
    // {
    //     $miles = (float) $request->query('miles');

    //     if ($miles <= 10) $fee = 0;
    //     elseif ($miles <= 50) $fee = $miles * 4;
    //     else $fee = ($miles - 50) * 2 + 200;

    //     return response()->json(['fee' => $fee]);
    // }
}
