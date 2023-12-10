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
                'id_penjualan' => 1,
                'kode_roti' => 8,
                'jumlah_roti' => 2,
            ],
            [
                'id_penjualan' => 2,
                'kode_roti' => 2,
                'jumlah_roti' => 2,
            ],
            [
                'id_penjualan' => 3,
                'kode_roti' => 11,
                'jumlah_roti' => 2,
            ],
            [
                'id_penjualan' => 4,
                'kode_roti' => 12,
                'jumlah_roti' => 4,
            ],
            [
                'id_penjualan' => 5,
                'kode_roti' => 10,
                'jumlah_roti' => 2,
            ],
            [
                'id_penjualan' => 6,
                'kode_roti' => 15,
                'jumlah_roti' => 2,
            ],
            [
                'id_penjualan' => 7,
                'kode_roti' => 14,
                'jumlah_roti' => 1,
            ],
            [
                'id_penjualan' => 8,
                'kode_roti' => 5,
                'jumlah_roti' => 6,
            ],
            [
                'id_penjualan' => 9,
                'kode_roti' => 13,
                'jumlah_roti' => 1,
            ],
            [
                'id_penjualan' => 10,
                'kode_roti' => 2,
                'jumlah_roti' => 2,
            ],
            [
                'id_penjualan' => 11,
                'kode_roti' => 18,
                'jumlah_roti' => 1,
            ],
            [
                'id_penjualan' => 12,
                'kode_roti' => 6,
                'jumlah_roti' => 2,
            ],
            [
                'id_penjualan' => 13,
                'kode_roti' => 6,
                'jumlah_roti' => 1,
            ],
            [
                'id_penjualan' => 14,
                'kode_roti' => 6,
                'jumlah_roti' => 3,
            ],
            [
                'id_penjualan' => 15,
                'kode_roti' => 11,
                'jumlah_roti' => 1,
            ],
        ]);
    }
}
