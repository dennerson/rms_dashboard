<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ZipCodeData extends Model
{
    use HasFactory;

    protected $table = 'zip_code_data';

    protected $primaryKey = 'zip_code';

    public $incrementing = false; // Since zip_code is a string and not auto-incrementing
    protected $keyType = 'string';

    protected $fillable = [
        'zip_code', 'branch_name', 'branch_zip', 'city', 'state', 'county',
        'miles', 'miles_incl', 'rate', 'actual', 'rounded', 'mileage_fee',
        'reservation', 'military'
    ];
}