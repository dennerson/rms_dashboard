<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ZipCodeData>
 */
class ZipCodeDataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'zip_code' => $this->faker->unique()->postcode,
            'branch_name' => $this->faker->company,
            'branch_zip' => $this->faker->postcode,
            'city' => $this->faker->city,
            'state' => $this->faker->stateAbbr,
            'county' => $this->faker->city,
            'miles' => $this->faker->randomFloat(2, 1, 100),
            'miles_incl' => $this->faker->randomFloat(2, 0, 50),
            'rate' => $this->faker->randomFloat(2, 50, 300),
            'actual' => (string) $this->faker->randomFloat(2, 50, 300),
            'rounded' => (string) $this->faker->randomFloat(2, 50, 300),
            'mileage_fee' => $this->faker->randomFloat(2, 1, 10),
            'reservation' => $this->faker->boolean,
            'military' => $this->faker->boolean,
        ];
    }
}