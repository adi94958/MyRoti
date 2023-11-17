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
            'id_transaksi'=> '3',
            'tanggal_pengambilan' => now(),
            'total_harga' => '25000',
            'total_dengan_rotibasi' => '30000',
            'uang_setoran' => '20000', 
            'catatan_penjual' => 'banyakin roti nanas'
        ]);

        DB::table('datapenjualan')->insert([
            'id_transaksi'=> '5',
            'tanggal_pengambilan' => Carbon::now()->subDays(2),
            'total_harga' => '20000',
            'total_dengan_rotibasi' => '20000',
            'uang_setoran' => '20000', 
            'catatan_penjual' => 'pesanan lengkap'
        ]); 
        
        DB::table('datapenjualan')->insert([
            'id_transaksi'=> '1',
            'tanggal_pengambilan' => now(),
            'total_harga' => '20000',
            'total_dengan_rotibasi' => '20000',
            'uang_setoran' => '20000', 
            'catatan_penjual' => 'pesanan lengkap'
        ]); 
    }
}
