<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\GenericImport;
use App\Models\CLientData;
use App\Models\ZipCodeData;

class ApiController extends Controller
{
    public function getClients(Request $request)
    {
        $pageSize = (int) $request->query('pageSize');
        $query = ClientData::query();

        $booleanFields = [
            "involuntary_fee_contracted",
            "voluntary_fee_contracted",
            "impound_fee_contracted",
            "military_base_fee_contracted",
            "reservation_fee_contracted",
            "oversized_fee_contracted",
            "two_stop_fee_contracted",
            "mileage_contracted",
            "authorization_required",
            "keys_required",
            "client_forms",
            "lienholder_forms",
        ];
        // transform
        $transform = function ($client) use ($booleanFields) {
            foreach ($booleanFields as $field) {
                if (isset($client->$field)) {
                    $client->$field = $client->$field ? 'Yes' : 'No';
                }
            }
            return $client;
        };

        if ($pageSize) {
            $clients = $query->paginate((int) $pageSize);
            $clients->getCollection()->transform($transform);

            return response()->json([
                'data' => $clients->items(),
                'currentPage' => $clients->currentPage(),
                'totalPages' => $clients->lastPage(),
                'pageSize' => $clients->perPage(),
                'totalRecords' => $clients->total(),
            ]);
        } else {
            $clients = $query->get()->map($transform);

            return response()->json([
                'data' => $clients,
            ]);
        }
    }

    public function createClient(Request $request)
    {
        CLientData::create($request->all());
        return response()->json(['message' => 'Client created successfully']);
    }

    public function updateClient(Request $request, $id)
    {
        $client = CLientData::findOrFail($id);
        $client->update($request->all());
        return response()->json(['message' => 'Client updated successfully']);
    }

    public function deleteClient($id)
    {
        CLientData::destroy($id);
        return response()->json(['message' => 'Client deleted successfully']);
    }

    public function uploadFileToClient(Request $request)
    {
        Log::info('Upload request recieved', ['hasFile' => $request->hasFile('file')]);

        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'No file uploaded!'], 400);
        }

        try {
            $file = $request->file('file');
            $path = $file->storeAs('uploads', $file->getClientOriginalName());
            Log::info('File stored', ['path' => $path]);
            $fullPath = Storage::path($path);
            Log::info('File full path stored', ['path' => $fullPath]);
            $data = Excel::toArray(new GenericImport, $fullPath)[0];

            forEach ($data as $index => $row) {
                if ($index === 0) continue;

                $existing = CLientData::where('client', $row[0])->where('lienholder', $row[1])->first();

                if (!$existing) {
                    CLientData::updateOrCreate([
                        'client' => $row[0] ?? null,
                        'lienholder' => $row[1] ?? null,
                        'use_system' => $row[2] ?? null,
                        'involuntary_fee' => $row[3] ?? null,
                        'involuntary_fee_contracted' => strtoupper($row[4] ?? 'NO') === 'YES' ? 1 : 0,
                        'voluntary_fee' => $row[5] ?? null,
                        'voluntary_fee_contracted' => strtoupper($row[6] ?? 'NO') === 'YES' ? 1 : 0,
                        'impound_fee' => $row[7] ?? null,
                        'impound_fee_contracted' => strtoupper($row[8] ?? 'NO') === 'YES' ? 1 : 0,

                        'reservation_fee' => $row[9] ?? null,
                        'reservation_fee_contracted' => strtoupper($row[10] ?? 'NO') === 'YES' ? 1 : 0,

                        'military_base_fee' => $row[11] ?? null,
                        'military_base_fee_contracted' => strtoupper($row[12] ?? 'NO') === 'YES' ? 1 : 0,

                        'oversized_fee' => $row[13] ?? null,
                        'oversized_fee_contracted' => strtoupper($row[14] ?? 'NO') === 'YES' ? 1 : 0,
                        'two_stop_fee' => $row[15] ?? null,
                        'two_stop_fee_contracted' => strtoupper($row[16] ?? 'NO') === 'YES' ? 1 : 0,
                        'reservation_close_fee' => $row[17] ?? null,
                        'military_base_close_fee' => $row[18] ?? null,
                        'oversized_close_fee' => $row[19] ?? null,
                        'impound_close_fee' => $row[20] ?? null,
                        'involuntary_close_fee' => $row[21] ?? null,
                        'miles_included' => $row[22] ?? null,
                        'mileage_rate' => $row[23] ?? null,
                        'mileage_contracted' => strtoupper($row[24] ?? 'NO') === 'YES' ? 1 : 0,
                        'authorization_required' => strtoupper($row[25] ?? 'NO') === 'YES' ? 1 : 0,
                        'keys_required' => strtoupper($row[26] ?? 'NO') === 'YES' ? 1 : 0,
                        'client_forms' => strtoupper($row[27] ?? 'NO') === 'YES' ? 1 : 0,
                        'lienholder_forms' => strtoupper($row[28] ?? 'NO') === 'YES' ? 1 : 0,
                    ]);
                }
            }
            return response()->json(['message' => 'Data imported successfully']);
        } catch (\Exception $e) {
            Log::error('Excel read error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to read Excel file'], 500);
        }
    }

    public function getBranch(Request $request)
    {
        $pageSize = (int) $request->query('pageSize', 10);
        $zipcodes = ZipCodeData::paginate($pageSize);

        $booleanFields = ['reservation', 'military'];

        $zipcodes->getCollection()->transform(function ($zip) use ($booleanFields) {
            foreach ($booleanFields as $field) {
                if (isset($zip->$field)) {
                    $zip->$field = $zip->$field ? 'Yes' : 'No';
                }
            }
            return $zip;
        });

        return response()->json([
            'data' => $zipcodes->items(),
            'currentPage' => $zipcodes->currentPage(),
            'totalPages' => $zipcodes->lastPage(),
            'pageSize' => $zipcodes->perPage(),
            'totalRecords' => $zipcodes->total(),
        ]);
    }

     public function createBranch(Request $request)
    {
        ZipCodeData::create($request->all());
        return response()->json(['message' => 'Client created successfully']);

    }

    private function convertBoolean($value)
    {
        if (is_string($value)) {
            $v = strtolower(trim($value));
            return ($v === 'yes') ? 1 : (($v === 'no' || str_contains($v, '?') || str_contains($v, 'verify')) ? 0 : (is_numeric($v) ? (float) $v : 0));
        }
        return is_numeric($value) ? (float) $value : 0;
    }

    public function updateBranch(Request $request, $zip_code)
    {
        $branch = ZipCodeData::findOrFail($zip_code);
        $branch->update($request->all());
        return response()->json(['message' => 'Client updated successfully']);
    }

    public function deleteBranch($zip_code)
    {
        $deleted = ZipCodeData::where('zip_code', $zip_code)->delete();

        if ($deleted) {
            return response()->json(['message' => 'Branch deleted successfully']);
        }else {
            return response()->json(['message' => 'Branch not found'], 404);
        }
    }

    public function uploadFileToBranch(Request $request)
    {
        Log::info('Upload request recieved', ['hasFile' => $request->hasFile('file')]);

        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'No file uploaded!'], 400);
        }

        try {
            $file = $request->file('file');
            $path = $file->storeAs('uploads', $file->getClientOriginalName());
            Log::info('File stored', ['path' => $path]);
            $fullPath = Storage::path($path);
            Log::info('File full path stored', ['path' => $fullPath]);
            $data = Excel::toArray(new GenericImport, $fullPath)[0];

            forEach ($data as $index => $row) {
                if ($index === 0) continue;

                $existing = ZipCodeData::where('zip_code', $row[0])->first();

                if (!$existing) {
                    ZipCodeData::updateOrCreate([
                        'zip_code' => $row[0] ?? null,
                        'branch_name' => $row[1] ?? null,
                        'branch_zip' => $row[2] ?? null,
                        'city' => $row[3] ?? null,
                        'state' => $row[4] ?? null,
                        'county' => $row[5] ?? null,
                        'miles' => $row[6] ?? null,
                        'miles_incl' => $row[7] ?? null,
                        'rate' => $row[8] ?? null,
                        'actual' => $row[9] ?? null,
                        'rounded' => $row[10] ?? null,
                        'mileage_fee' => $row[11] ?? null,
                        'reservation' => strtoupper($row[12] ?? 'NO') === 'YES' ? 1 : 0,
                        'military' => strtoupper($row[13] ?? 'NO') === 'YES' ? 1 : 0,
                    ]);
                }
            }
            return response()->json(['message' => 'Data imported successfully']);
        } catch (\Exception $e) {
            Log::error('Excel read error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to read Excel file'], 500);
        }
    }
}