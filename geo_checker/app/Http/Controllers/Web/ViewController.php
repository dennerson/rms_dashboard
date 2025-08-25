<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ClientData;
use App\Models\ZipCodeData;

class ViewController extends Controller
{
    public function showClients()
    {
        $clients = ClientData::paginate(10);
        return view('clients.index', compact('clients'));
    }

    public function showZipCodes()
    {
        $zipcodes = ZipCodeData::paginate(10);
        return view('zipcodes.index', compact('zipcodes'));
    }
}