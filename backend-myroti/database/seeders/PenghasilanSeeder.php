<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenghasilanSeeder extends Seeder
{
    public function run()
    {
        DB::table('penghasilan')->insert([
            'id_kurir' => 1,
            'penghasilan' => 100000,
            'tanggal_pengiriman' => Carbon::today(), // Set the date as today
        ]);

        DB::table('penghasilan')->insert([
            'id_kurir' => 1,
            'penghasilan' => 100000,
            'tanggal_pengiriman' => Carbon::tomorrow(), // Set the date as tomorrow
        ]);
    }
}
