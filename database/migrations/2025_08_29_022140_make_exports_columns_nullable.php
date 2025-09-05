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
        Schema::table('exports', function (Blueprint $table) {
            $table->string('client')->nullable()->change();
            $table->string('zip')->nullable()->change();
            $table->string('location')->nullable()->change();
            $table->string('miles')->nullable()->change();
            $table->string('branch_zip')->nullable()->change();
            $table->string('branch_location')->nullable()->change();
            $table->string('mileage')->nullable()->change();
            $table->string('vin')->nullable()->change();
            $table->string('size')->nullable()->change();
            $table->string('zone')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exports', function (Blueprint $table) {
            $table->string('client')->nullable(false)->change();
            $table->string('zip')->nullable(false)->change();
            $table->string('location')->nullable(false)->change();
            $table->string('miles')->nullable(false)->change();
            $table->string('branch_zip')->nullable(false)->change();
            $table->string('branch_location')->nullable(false)->change();
            $table->string('mileage')->nullable(false)->change();
            $table->string('vin')->nullable(false)->change();
            $table->string('size')->nullable(false)->change();
            $table->string('zone')->nullable(false)->change();
        });
    }
};
