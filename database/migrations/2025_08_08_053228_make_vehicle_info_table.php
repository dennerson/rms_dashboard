<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicle_info', function (Blueprint $table) {
            $table->id();
            $table->string('vin')->unique();
            $table->string('make')->nullable();
            $table->string('model')->nullable();
            $table->string('model_year')->nullable();
            $table->string('engine')->nullable();
            $table->string('transmission')->nullable();
            $table->string('trim')->nullable();
            $table->string('fuel_type')->nullable();
            $table->string('vehicle_type')->nullable();
            $table->string('is_oversized')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_info');
    }
};