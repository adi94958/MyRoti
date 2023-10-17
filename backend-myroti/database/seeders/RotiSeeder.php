<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RotiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dataroti')->insert([
            [
                'nama_roti' => 'croissant',
                'stok_roti' =>  20, 
                'rasa_roti'=> 'strawberry',
                'harga_satuan_roti' => 5000,
            ],
            [
                'nama_roti' => 'macaron',
                'stok_roti' =>  30, 
                'rasa_roti'=> 'strawberry',
                'harga_satuan_roti' => 5000,
            ]
            ]);
    }
}
