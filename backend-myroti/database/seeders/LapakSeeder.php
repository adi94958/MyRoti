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
            'nama_lapak' => 'Lapak A',
            'area_id' => 1, 
            'alamat_lapak' => 'Alamat Lapak A',
            'created_at' => date('Y-m-d', strtotime('-1 day')),
            'id_kurir' => 3
        ]);

    }
}
