<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class DataPenjualanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('datapenjualan')->insert([
            [
                'id_transaksi' => '1',
                'tanggal_pengambilan' => now(),
                'total_harga' => '20000',
                'total_dengan_rotibasi' => '20000',
                'uang_setoran' => '20000',
                'catatan_penjual' => 'pesanan lengkap',
            ],
            [
                'id_transaksi' => '2',
                'tanggal_pengambilan' => Carbon::now()->subDays(3),
                'total_harga' => '18000',
                'total_dengan_rotibasi' => '20000',
                'uang_setoran' => '18000',
                'catatan_penjual' => 'roti kurang',
            ],
            [
                'id_transaksi' => '3',
                'tanggal_pengambilan' => now(),
                'total_harga' => '25000',
                'total_dengan_rotibasi' => '30000',
                'uang_setoran' => '20000',
                'catatan_penjual' => 'banyakin roti nanas',
            ],
            [
                'id_transaksi' => '4',
                'tanggal_pengambilan' => Carbon::now()->subDays(5),
                'total_harga' => '22000',
                'total_dengan_rotibasi' => '25000',
                'uang_setoran' => '22000',
                'catatan_penjual' => 'roti terlalu banyak',
            ],
            [
                'id_transaksi' => '5',
                'tanggal_pengambilan' => Carbon::now()->subDays(2),
                'total_harga' => '200000',
                'total_dengan_rotibasi' => '200000',
                'uang_setoran' => '200000',
                'catatan_penjual' => 'pesanan lengkap',
            ],
            [
                'id_transaksi' => '6',
                'tanggal_pengambilan' => now(),
                'total_harga' => '30000',
                'total_dengan_rotibasi' => '35000',
                'uang_setoran' => '30000',
                'catatan_penjual' => 'banyakin roti coklat',
            ],
            [
                'id_transaksi' => '7',
                'tanggal_pengambilan' => Carbon::now()->subDays(7),
                'total_harga' => '18000',
                'total_dengan_rotibasi' => '20000',
                'uang_setoran' => '18000',
                'catatan_penjual' => 'roti kurang',
            ],
            [
                'id_transaksi' => '8',
                'tanggal_pengambilan' => now(),
                'total_harga' => '22000',
                'total_dengan_rotibasi' => '25000',
                'uang_setoran' => '22000',
                'catatan_penjual' => 'roti terlalu banyak',
            ],
            [
                'id_transaksi' => '9',
                'tanggal_pengambilan' => Carbon::now()->subDays(3),
                'total_harga' => '30000',
                'total_dengan_rotibasi' => '35000',
                'uang_setoran' => '30000',
                'catatan_penjual' => 'banyakin roti coklat',
            ],
            [
                'id_transaksi' => '10',
                'tanggal_pengambilan' => now(),
                'total_harga' => '18000',
                'total_dengan_rotibasi' => '20000',
                'uang_setoran' => '18000',
                'catatan_penjual' => 'roti kurang',
            ],
            [
                'id_transaksi' => '11',
                'tanggal_pengambilan' => Carbon::now()->subDays(5),
                'total_harga' => '22000',
                'total_dengan_rotibasi' => '25000',
                'uang_setoran' => '22000',
                'catatan_penjual' => 'roti terlalu banyak',
            ],
            [
                'id_transaksi' => '12',
                'tanggal_pengambilan' => now(),
                'total_harga' => '30000',
                'total_dengan_rotibasi' => '35000',
                'uang_setoran' => '30000',
                'catatan_penjual' => 'banyakin roti coklat',
            ],
            [
                'id_transaksi' => '13',
                'tanggal_pengambilan' => Carbon::now()->subDays(2),
                'total_harga' => '25000',
                'total_dengan_rotibasi' => '30000',
                'uang_setoran' => '25000',
                'catatan_penjual' => 'banyakin roti nanas',
            ],
            [
                'id_transaksi' => '14',
                'tanggal_pengambilan' => now(),
                'total_harga' => '20000',
                'total_dengan_rotibasi' => '20000',
                'uang_setoran' => '20000',
                'catatan_penjual' => 'pesanan lengkap',
            ],
            [
                'id_transaksi' => '15',
                'tanggal_pengambilan' => Carbon::now()->subDays(1),
                'total_harga' => '20000',
                'total_dengan_rotibasi' => '20000',
                'uang_setoran' => '20000',
                'catatan_penjual' => 'pesanan lengkap',
            ],
        ]);
    }
}
