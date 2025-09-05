<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Export extends Model
{
    use HasFactory;

    protected $fillable = [
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
        'date',
    ];
}