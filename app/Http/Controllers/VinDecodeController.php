<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class VinDecodeController extends Controller
{
    public function decode(Request $request)
    {
        $vin = $request->input('vin');

        if (!$vin || strlen($vin) != 17) {
            return response()->json(['error' => 'A valid 17-character VIN is required.'], 400);
        }

        $apiUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/{$vin}?format=json";

        try {
            $response = Http::get($apiUrl);
            $data = $response->json();

            if (!isset($data['Results']) || empty($data['Results'])) {
                return response()->json(['error' => 'No data found for the provided VIN. '], 404);
            }

            $details = [];
            foreach ($data['Results'] as $item) {
                if (!empty($item['Value'])) {
                    $details[$item['Variable']] = $item['Value'];
                }
            }

            $oversized = $this->isOversized($details);

            // save to DB
            DB::table('vehicle_info')->insert([
                'vin' => $vin,
                'make' => $details['Make'] ?? null,
                'model' => $details['Model'] ?? null,
                'model_year' => $details['Model Year'] ?? null,
                'trim' => $details['Trim'] ?? null,
                'vehicle_type' => $details['Vehicle Type'] ?? null,
                'engine' => $details['Engine Model'] ?? null,
                'fuel_type' => $details['Fuel Type - Primary'] ?? null,
                'transmission' => $details['Transmission Style'] ?? null,
                'is_oversized' => $oversized,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'data' => $details,
                'is_oversized' => $oversized,
                'message' => 'VIN details saved to database',
            ]);
        } catch (\Exception $e) {
            \Log::error('Error decoding VIN: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error. '], 500);
        }
    }

    private function isOversized($details)
    {
        $gvwr = strtolower($details['Gross Vehicle Weight Rating From'] ?? '');
        $bodyClass = strtolower($details['Body Class'] ?? '');
        $wheelbase = (float)($details['Wheel Base (inches) From'] ?? 0);

            if (
                str_contains($gvwr, '10,000') ||
                str_contains($gvwr, 'class 3') ||
                str_contains($gvwr, 'class 4')
            ) {
                return 'Oversized';
            }

            // extract the numeric GVWR
            if (preg_match('/(\d{1,3}(?:,\d{3})*)\s*lb/', $gvwr, $matches)) {
                $weight = (int)str_replace(',', '', $matches[1]);
                if ($weight > 10000) {
                    return 'Oversized';
                }
            }
            // check oversized body types
            $oversizedBodyTypes = ['Truck', 'Van', 'SUV', 'Bus', 'Motorhome'];
            foreach ($oversizedBodyTypes as $type) {
                if (str_contains($bodyClass, $type)) {
                    return 'Oversized';
                }
            }
            // check wheelbase
            if ($wheelbase > 130) {
                return 'Oversized';
            }

        return 'Standard';
    }
}