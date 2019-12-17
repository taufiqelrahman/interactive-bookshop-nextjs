<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(PaymentMethodsTableSeeder::class);
        $this->call(StoryPagesTableSeeder::class);
    }
}
