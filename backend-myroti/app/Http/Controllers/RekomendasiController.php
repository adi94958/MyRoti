<?php

namespace App\Http\Controllers;

use App\Models\DataPenjualan;
use Illuminate\Support\Facades\DB;

class RekomendasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function readRiwayatPenjualan()
     {
        $datas = DataPenjualan::select(
            'transaksi.id_transaksi',
            'transaksi.kode_lapak',
            'transaksi_roti.kode_roti',
            'rotibasi.jumlah_roti as jumlah_rotibasi',
            'transaksi_roti.jumlah_roti',
            DB::raw('CASE WHEN rotibasi.jumlah_roti = 0 THEN transaksi_roti.jumlah_roti + 5 ELSE transaksi_roti.jumlah_roti - 2 END as calculated_value')
        )
            ->join('transaksi', 'datapenjualan.id_transaksi', '=', 'transaksi.id_transaksi')
            ->leftJoin('rotibasi', 'datapenjualan.id_penjualan', '=', 'rotibasi.id_penjualan')
            ->join('transaksi_roti', 'transaksi.id_transaksi', '=', 'transaksi_roti.id_transaksi')
            ->where('transaksi.tanggal_pengiriman', '>=', now()->subWeek())
            ->groupBy('transaksi.id_transaksi', 'transaksi.kode_lapak', 'transaksi_roti.kode_roti', 'transaksi_roti.jumlah_roti', 'rotibasi.jumlah_roti') 
            ->get();
    
        return response()->json($datas, 200);
     }
     

     
          

}