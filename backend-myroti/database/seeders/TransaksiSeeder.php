<?php

namespace Database\Seeders;

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
                'id_kurir' => '9',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti1',
                'status' => 'finished'
            ],
            [
                'kode_lapak' => '6',
                'id_kurir' => '10',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti2',
                'status' => 'finished'
            ],
            [
                'kode_lapak' => '7',
                'id_kurir' => '9',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti3',
                'status' => 'finished'
            ],
            [
                'kode_lapak' => '8',
                'id_kurir' => '12',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti4',
                'status' => 'finished'
            ],
            [
                'kode_lapak' => '9',
                'id_kurir' => '13',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti5',
                'status' => 'finished'
            ],
        ]);
    }
}
