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
             'transaksi.kode_lapak',
             'transaksi_roti.kode_roti',
             DB::raw('SUM(transaksi_roti.jumlah_roti) as jumlah_roti_transaksi'),
             DB::raw('SUM(rotibasi.jumlah_roti) as jumlah_roti_rotibasi'),
             DB::raw('CASE WHEN SUM(rotibasi.jumlah_roti) = 0 THEN SUM(transaksi_roti.jumlah_roti) + 5 ELSE SUM(transaksi_roti.jumlah_roti) - 2 END as calculated_value')
         )
         ->join('transaksi', 'datapenjualan.id_transaksi', '=', 'transaksi.id_transaksi')
         ->leftJoin('rotibasi', 'datapenjualan.id_penjualan', '=', 'rotibasi.id_penjualan')
         ->join('transaksi_roti', 'transaksi.id_transaksi', '=', 'transaksi_roti.id_transaksi')
         ->where('transaksi.tanggal_pengiriman', '>=', now()->subWeek())
         ->groupBy('transaksi.kode_lapak', 'transaksi_roti.kode_roti')
         ->get();
     
         return response()->json($datas, 200);
     }
          

}