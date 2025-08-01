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
        Schema::table('zone_checks', function (Blueprint $table) {
            $table->boolean('is_tribal')->default(0)->after('id');
            $table->boolean('is_military')->default(0)->after('is_tribal');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('zone_checks', function (Blueprint $table) {
            $table->dropColumn(['is_tribal', 'is_military']);
        });
    }
};