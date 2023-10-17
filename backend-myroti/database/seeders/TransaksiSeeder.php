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
        [
            'kode_lapak' => '5',
            'kode_roti' => '1',
            'jumlah_roti' => 10,
            'id_kurir' => 9,
            'tanggal_pengiriman' => now(),
        ],
        [
            'kode_lapak' => '5',
            'kode_roti' => '2',
            'jumlah_roti' => 20,
            'id_kurir' => 9,
            'tanggal_pengiriman' => now(),
        ],
        [
            'kode_lapak' => '5',
            'kode_roti' => '2',
            'jumlah_roti' => 10,
            'id_kurir' => 9,
            'tanggal_pengiriman' => now()->subDays(1)->toDateTimeString(),
        ],
        [
            'kode_lapak' => '1',
            'kode_roti' => '1',
            'jumlah_roti' => 12,
            'id_kurir' => 1,
            'tanggal_pengiriman' => now()->subDays(1)->toDateTimeString(),
        ],
        [
            'kode_lapak' => '1',
            'kode_roti' => '2',
            'jumlah_roti' => 19,
            'id_kurir' => 1,
            'tanggal_pengiriman' => now()->subDays(1)->toDateTimeString(),
        ],
        [
            'kode_lapak' => '10',
            'kode_roti' => '1',
            'jumlah_roti' => 30,
            'id_kurir' => 15,
            'tanggal_pengiriman' => now()->subDays(10)->toDateTimeString(),
        ],
        [
            'kode_lapak' => '10',
            'kode_roti' => '2',
            'jumlah_roti' => 10,
            'id_kurir' => 15,
            'tanggal_pengiriman' => now()->subDays(10)->toDateTimeString(),
        ],


        ]);
    }
}
