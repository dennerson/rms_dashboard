<?php

namespace App\Exports;

use App\Models\Export;
use Maatwebsite\Excel\Concerns\FromCollection;

class ReportExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // return Export::all();
        return Export::select(
            'client',
            'zip',
            'location',
            'miles',
            'branch_zip',
            'branch_location',
            'mileage',
            'vin',
            'size',
            'zone',
            'date'
        )->get();
    }
}