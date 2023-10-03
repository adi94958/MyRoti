<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KoordinatorSeeder extends Seeder
{
    public function run()
    {
        // Tambahkan data dummy ke tabel "koordinator"
        DB::table('koordinators')->insert([
            'nama' => 'Koordinator 1',
            'username' => 'KoordLoh',
            'password' => 'alyaa',
            'user_type' => 'koordinator',
            // Tambahkan kolom lain sesuai kebutuhan
        ]);
        
        // Tambahkan data dummy lainnya jika diperlukan
    }
}