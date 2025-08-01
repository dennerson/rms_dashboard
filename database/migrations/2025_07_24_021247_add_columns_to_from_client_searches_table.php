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
        Schema::table('from_client_searches', function (Blueprint $table) {
            $table->string('origin_address')->nullable()->after('id');
            $table->string('destination_address')->nullable()->after('origin_address');
            $table->string('distance')->nullable()->after('destination_address');
            $table->string('duration')->nullable()->after('distance');
            $table->string('numeric_distance')->nullable()->after('duration');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('client_searches', function (Blueprint $table) {
            $table->dropColumn(['origin_address', 'destination_address', 'distance', 'duration', 'numeric_distance']);
        });
    }
};