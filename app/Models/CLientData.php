<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class CLientData extends Model
{
    use HasFactory;
    protected $table = 'client_data';

    protected $fillable = [
        'client',
        'lienholder',
        'use_system',
        'involuntary_fee',
        'involuntary_fee_contracted',
        'voluntary_fee',
        'voluntary_fee_contracted',
        'impound_fee',
        'impound_fee_contracted',
        'reservation_fee',
        'reservation_fee_contracted',
        'military_base_fee',
        'military_base_fee_contracted',
        'oversized_fee',
        'oversized_fee_contracted',
        'two_stop_fee',
        'two_stop_fee_contracted',
        'reservation_close_fee',
        'military_base_close_fee',
        'oversized_close_fee',
        'impound_close_fee',
        'involuntary_close_fee',
        'miles_included',
        'mileage_rate',
        'mileage_contracted',
        'authorization_required',
        'keys_required',
        'client_forms',
        'lienholder_forms'
    ];
}