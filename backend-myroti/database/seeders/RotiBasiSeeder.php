<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RotiBasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rotibasi')->insert([
            [
                'id_penjualan'=> 1, 
                'kode_roti'=> 2, 
                'jumlah_roti'=> 2
            ],
            [
                'id_penjualan'=> 2, 
                'kode_roti'=> 1, 
                'jumlah_roti'=> 0
            ]
            ]);
        }
}
