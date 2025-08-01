<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FeeController extends Controller
{
    public function mileageFee(Request $request)
    {
        try {
            // Get rows from the database (similar to Node.js query)
            $rows = DB::select("
                SELECT
                    a.distance AS miles,
                    a.destination_zip,
                    a.origin_address AS branch,
                    a.destination_address,
                    b.miles_incl,
                    b.rate
                FROM
                    distances AS a
                INNER JOIN
                    zip_code_data AS b
                ON
                    a.destination_zip = b.zip_code
            ");
            // dd('rows: ',$rows);
            $results = [];

            foreach ($rows as $row) {
                $miles = (int) str_replace(' mi', '', $row->miles);
                $actual = max($miles - $row->miles_incl, 0) * $row->rate;
                $rounded = $actual > 0 ? ceil($actual / 25) * 25 : 0;
                $mileageFee = $rounded === 25 ? $rounded + 25 : $rounded;
                // dd($mileageFee);
                $results = [
                    'miles'        => $row->miles,
                    'miles_incl'   => $row->miles_incl,
                    'rate'         => $row->rate,
                    'actual'       => number_format($actual, 2),
                    'rounded'      => $rounded,
                    'mileageFee'   => $mileageFee,
                    'branch'       => $row->branch,
                    // 'origin_address' => $row->branch_address,
                ];
                // dd($results);

                // Update the from_client_search table
                // DB::update("
                //     UPDATE from_client_searches
                //     SET miles = ?, mileage_fee = ?, branch_address = ?
                //     WHERE location = ?
                // ", [
                //     $row->miles,
                //     $mileageFee,
                //     $row->branch_address,
                //     $row->branch
                // ]);
            }

            return response()->json([
                'success' => true,
                'data' => $results
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in mileageFee controller: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error'
            ], 500);
        }
    }
}