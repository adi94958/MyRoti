<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class TransaksiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transaksi')->insert([
            'kode_lapak' => '5',
            'kode_roti' => '1',
            'jumlah_roti' => 10,
            'id_kurir' => 3,
            'tanggal_pengiriman' => now(),
        ]);
    }
}
