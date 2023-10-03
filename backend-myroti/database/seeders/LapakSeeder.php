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
        DB::table('lapak')->insert([
            'nama_roti' => 'Croissant',
            'stok_roti' => 10,
            'rasa_roti' => 'Strawberry',
            'harga_satuan_roti' => 10000,
        ]);
        
    }
}
