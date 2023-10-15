<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DataPenjualanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('datapenjualan')->insert([
            'id_transaksi' => 101,
            'tanggal_pengiriman' => now(),
            'status' => 'Dikirim',
            'bukti_pengiriman' => 'bukti_pengiriman_4.jpg',
            'uang_setoran' => 360.00,
            'roti_basi' => 3,
            'catatan_penjual' => 'Pesanan lengkap',
            'status_setor' => 'Lunas',
        ]);
    }
}
