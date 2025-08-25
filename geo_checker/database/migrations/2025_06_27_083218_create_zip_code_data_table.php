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
        Schema::create('zip_code_data', function (Blueprint $table) {
            $table->string('zip_code')->primary();
            $table->string('branch_name')->nullable();
            $table->string('branch_zip')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('county')->nullable();
            $table->float('miles')->nullable();
            $table->float('miles_incl')->nullable();
            $table->decimal('rate', 10, 2)->nullable();
            $table->string('actual')->nullable();
            $table->string('rounded')->nullable();
            $table->decimal('mileage_fee', 10, 2)->nullable();
            $table->boolean('reservation')->default(0);
            $table->boolean('military')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zip_code_data');
    }
};