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
        Schema::create('client_data', function (Blueprint $table) {
            $table->id();
            $table->string('client')->nullable();
            $table->string('lienholder')->nullable();
            $table->string('use_system')->nullable();
            $table->decimal('involuntary_fee', 10, 2)->nullable();
            $table->boolean('involuntary_fee_contracted')->default(0);
            $table->decimal('voluntary_fee', 10, 2)->nullable();
            $table->boolean('voluntary_fee_contracted')->default(0);
            $table->decimal('impound_fee', 10, 2)->nullable();
            $table->boolean('impound_fee_contracted')->default(0);
            $table->decimal('reservation_fee', 10, 2)->nullable();
            $table->boolean('reservation_fee_contracted')->default(0);
            $table->decimal('military_base_fee', 10, 2)->nullable();
            $table->boolean('military_base_fee_contracted')->default(0);
            $table->decimal('oversized_fee', 10, 2)->nullable();
            $table->boolean('oversized_fee_contracted')->default(0);
            $table->decimal('two_stop_fee', 10, 2)->nullable();
            $table->boolean('two_stop_fee_contracted')->default(0);
            $table->decimal('reservation_close_fee', 10, 2)->nullable();
            $table->decimal('military_base_close_fee', 10, 2)->nullable();
            $table->decimal('oversized_close_fee', 10, 2)->nullable();
            $table->decimal('impound_close_fee', 10, 2)->nullable();
            $table->decimal('involuntary_close_fee', 10, 2)->nullable();
            $table->integer('miles_included')->nullable();
            $table->decimal('mileage_rate', 10, 2)->nullable();
            $table->boolean('mileage_contracted')->default(0);
            $table->boolean('authorization_required')->default(0);
            $table->boolean('keys_required')->default(0);
            $table->boolean('client_forms')->default(0);
            $table->boolean('lienholder_forms')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_data');
    }
};