<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class VehicleController extends Controller
{
    public function decode(Request $request)
    {
        $vin = $request->input('vin');
        $url = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/{$vin}?format=json";

        $response = Http::get($url);
        $data = $response->json();

        $result = collect($data['Results'])->keyBy('Variable')->only(['Make', 'Model', 'Model Year']);
        // dd($result);

        return response()->json($result);
    }
}