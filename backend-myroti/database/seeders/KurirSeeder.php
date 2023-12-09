<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KurirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = ['Joni', 'Dona', 'Eka', 'Rudi', 'Sari', 'Tono', 'Nina', 'Andy', 'Lina', 'Budi', 'Dina', 'Candra', 'Rina', 'Eko', 'Sinta', 'Gandi', 'Lani', 'Hadi', 'Susi', 'Yanto', 'Maya', 'Agus', 'Lila', 'Firman', 'Rita', 'Bayu', 'Yuni', 'Dito', 'Siska', 'Hendro', 'Nita', 'Fajar', 'Rina', 'Eko', 'Sinta', 'Gandi', 'Lani', 'Hadi', 'Susi', 'Yanto', 'Maya', 'Agus', 'Lila', 'Firman', 'Rita', 'Bayu', 'Yuni', 'Dito', 'Siska', 'Hendro', 'Nita', 'Fajar', 'Rina'];

        foreach ($names as $index => $name) {
            $username = 'kurir' . ($index + 1);
            $password = Crypt::encryptString($username);
            $area_id = ($index % 48) + 1; // Jumlah area yang tersedia

            DB::table('kurirs')->insert([
                'username' => $username,
                'password' => $password,
                'nama' => $name,
                'area_id' => $area_id,
                'user_type' => 'kurir',
                'no_telp' => '09876' . ($index + 100),
                'created_at' => now()->subDays($index),
                'updated_at' => now(),
            ]);
        }
    }
}
