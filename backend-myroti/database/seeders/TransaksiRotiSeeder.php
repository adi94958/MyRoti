<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransaksiRotiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transaksi_roti')->insert([
            [
                'id_transaksi' => '3', 
                'kode_roti' => '2', 
                'jumlah_roti'=> '5',
            ],
            [
                'id_transaksi' => '1', 
                'kode_roti' => '1', 
                'jumlah_roti'=> '10',
            ]
        ]);
    }
}
