<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\GenericImport;
use App\Models\ClientData;
use App\Models\ZipCodeData;

class ApiController extends Controller
{
    public function getClients(Request $request)
    {
        $pageSize = (int) $request->query('pageSize', 10);
        $clients = ClientData::paginate($pageSize);

        $booleanFields = [
            "involuntary_fee_contracted", "voluntary_fee_contracted", "impound_fee_contracted",
            "military_base_fee_contracted", "reservation_fee_contracted", "oversized_fee_contracted",
            "two_stop_fee_contracted", "mileage_contracted", "authorization_required",
            "keys_required", "client_forms", "lienholder_forms",
        ];

        $clients->getCollection()->transform(function ($client) use ($booleanFields) {
            foreach ($booleanFields as $field) {
                if (isset($client->$field)) {
                    $client->$field = $client->$field ? 'Yes' : 'No';
                }
            }
            return $client;
        });

        return response()->json([
            'data' => $clients->items(),
            'currentPage' => $clients->currentPage(),
            'totalPages' => $clients->lastPage(),
            'pageSize' => $clients->perPage(),
            'totalRecords' => $clients->total(),
        ]);
    }

    public function getZipCodes(Request $request)
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

    public function createClient(Request $request)
    {
        ClientData::create($request->all());
        return response()->json(['message' => 'Client created successfully']);
    }

    public function updateClient(Request $request, $id)
    {
        $client = ClientData::findOrFail($id);
        $client->update($request->all());
        return response()->json(['message' => 'Client updated successfully']);
    }

    public function deleteClient($id)
    {
        ClientData::destroy($id);
        return response()->json(['message' => 'Client deleted successfully']);
    }

    public function uploadFile(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'No file uploaded!'], 400);
        }

        $path = $request->file('file')->store('uploads');

        try {
            $data = Excel::toArray(new GenericImport, storage_path("app/{$path}"));
            return response()->json(['data' => $data[0]]);
        } catch (\Exception $e) {
            Log::error('Excel read error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to read Excel file'], 500);
        }
    }

    public function saveZipCodeData(Request $request)
    {
        $data = $request->input('data');
        if (!$data || count($data) < 2) {
            return response()->json(['message' => 'Invalid data format'], 400);
        }

        $columns = $data[0];
        $rows = array_slice($data, 1);
        $dbColumns = array_map(function ($header) {
            return config('mappings.zip_column_mapping')[$header] ?? null;
        }, $columns);

        if (in_array(null, $dbColumns, true)) {
            return response()->json(['message' => 'Invalid headers in the file'], 400);
        }

        $formattedRows = array_map(function ($row) use ($dbColumns) {
            return array_map(function ($value, $i) use ($dbColumns) {
                $column = $dbColumns[$i];
                if (in_array($column, ['reservation', 'military', 'miles'])) {
                    return $this->convertBoolean($value);
                }
                return $value;
            }, $row, array_keys($row));
        }, $rows);

        $insertData = array_map(function ($row) use ($dbColumns) {
            return array_combine($dbColumns, $row);
        }, $formattedRows);

        ZipCodeData::insertOrIgnore($insertData);

        return response()->json(['message' => 'Data inserted successfully']);
    }

    private function convertBoolean($value)
    {
        if (is_string($value)) {
            $v = strtolower(trim($value));
            return ($v === 'yes') ? 1 : (($v === 'no' || str_contains($v, '?') || str_contains($v, 'verify')) ? 0 : (is_numeric($v) ? (float) $v : 0));
        }
        return is_numeric($value) ? (float) $value : 0;
    }
}