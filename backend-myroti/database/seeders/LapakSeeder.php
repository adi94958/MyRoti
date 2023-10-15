<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LapakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('dataroti')->insert([
            'nama_roti' => 'Croissant',
            'stok_roti' => 10,
            'rasa_roti' => 'Strawberry',
            'harga_satuan_roti' => 10000,
        ]);

        DB::table('lapak')->insert([
            'nama_lapak' => 'Lapak A',
            'id_area_distribusi' => 1, 
            'alamat_lapak' => 'Alamat Lapak A',
            'created_at' => date('Y-m-d', strtotime('-1 day')),
        ]);

        DB::table('lapak')->insert([
            'nama_lapak' => 'Lapak B',
            'id_area_distribusi' => 2, 
            'alamat_lapak' => 'Alamat Lapak B',
            'created_at' => now(),
        ]);
        
    }
}
