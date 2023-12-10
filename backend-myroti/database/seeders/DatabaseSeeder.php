<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        //         URUTAN SEEDER
        $this->call(AreaSeeder::class);
        $this->call(RotiSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(KurirSeeder::class);
        $this->call(LapakSeeder::class);
        $this->call(TransaksiSeeder::class);
        $this->call(KoordinatorSeeder::class);
        $this->call(TransaksiRotiSeeder::class);
        $this->call(DataPenjualanSeeder::class);
        $this->call(RotiBasiSeeder::class);
        $this->call(PenghasilanSeeder::class);
    }
}
