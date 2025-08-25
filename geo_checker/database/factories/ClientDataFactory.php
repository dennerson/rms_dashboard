<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClientData>
 */
class ClientDataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client' => $this->faker->company,
            'lienholder' => $this->faker->company,
            'use_system' => $this->faker->randomElement(['YARDI', 'RDN', 'CLEARPLAN']),
            'involuntary_fee' => $this->faker->randomFloat(2, 50, 300),
            'involuntary_fee_contracted' => $this->faker->boolean,
            'voluntary_fee' => $this->faker->randomFloat(2, 50, 300),
            'voluntary_fee_contracted' => $this->faker->boolean,
            'impound_fee' => $this->faker->randomFloat(2, 50, 300),
            'impound_fee_contracted' => $this->faker->boolean,
            'reservation_fee' => $this->faker->randomFloat(2, 50, 300),
            'reservation_fee_contracted' => $this->faker->boolean,
            'military_base_fee' => $this->faker->randomFloat(2, 50, 300),
            'military_base_fee_contracted' => $this->faker->boolean,
            'oversized_fee' => $this->faker->randomFloat(2, 50, 300),
            'oversized_fee_contracted' => $this->faker->boolean,
            'two_stop_fee' => $this->faker->randomFloat(2, 50, 300),
            'two_stop_fee_contracted' => $this->faker->boolean,
            'reservation_close_fee' => $this->faker->randomFloat(2, 50, 300),
            'military_base_close_fee' => $this->faker->randomFloat(2, 50, 300),
            'oversized_close_fee' => $this->faker->randomFloat(2, 50, 300),
            'impound_close_fee' => $this->faker->randomFloat(2, 50, 300),
            'involuntary_close_fee' => $this->faker->randomFloat(2, 50, 300),
            'miles_included' => $this->faker->numberBetween(0, 100),
            'mileage_rate' => $this->faker->randomFloat(2, 1, 5),
            'mileage_contracted' => $this->faker->boolean,
            'authorization_required' => $this->faker->boolean,
            'keys_required' => $this->faker->boolean,
            'client_forms' => $this->faker->boolean,
            'lienholder_forms' => $this->faker->boolean,
        ];
    }
}