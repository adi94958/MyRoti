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
                'kode_lapak' => '1',
                'id_kurir' => '1',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti1',
                'status' => 'finished'
            ],
            [
                'kode_lapak' => '1',
                'id_kurir' => '1',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti2',
                'status' => 'finished'
            ],
            [
                'kode_lapak' => '3',
                'id_kurir' => '5',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti3',
                'status' => 'finished'
            ],
            [
                'kode_lapak' => '4',
                'id_kurir' => '7',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti4',
                'status' => 'finished'
            ],
            [
                'kode_lapak' => '5',
                'id_kurir' => '9',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti5',
                'status' => 'finished'
            ],
            [
                'kode_lapak' => '6',
                'id_kurir' => '11',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti6',
                'status' => 'on delivery'
            ],
            [
                'kode_lapak' => '7',
                'id_kurir' => '12',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti7',
                'status' => 'on delivery'
            ],
            [
                'kode_lapak' => '8',
                'id_kurir' => '13',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti8',
                'status' => 'on delivery'
            ],
            [
                'kode_lapak' => '9',
                'id_kurir' => '14',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti9',
                'status' => 'on delivery'
            ],
            [
                'kode_lapak' => '10',
                'id_kurir' => '15',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti10',
                'status' => 'delivered'
            ],
            [
                'kode_lapak' => '11',
                'id_kurir' => '2',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti11',
                'status' => 'delivered'
            ],
            [
                'kode_lapak' => '12',
                'id_kurir' => '4',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti12',
                'status' => 'delivered'
            ],
            [
                'kode_lapak' => '13',
                'id_kurir' => '6',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti13',
                'status' => 'ready'
            ],
            [
                'kode_lapak' => '14',
                'id_kurir' => '8',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti14',
                'status' => 'ready'
            ],
            [
                'kode_lapak' => '15',
                'id_kurir' => '10',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti15',
                'status' => 'ready'
            ],
            [
                'kode_lapak' => '1',
                'id_kurir' => '1',
                'tanggal_pengiriman' => now(),
                'bukti_pengiriman' => 'bukti3',
                'status' => 'delivered'
            ],
        ]);
    }
}
