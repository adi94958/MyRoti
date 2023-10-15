<?php

namespace App\Http\Controllers;

use App\Models\Kurir;
use App\Models\Koordinator;
use App\Models\DataPenjualan;
use App\Models\Lapak;
use App\Models\TransaksiRoti;
use App\Models\Transaksi;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function adminDashboard()
{
    $koordinatorCount = Koordinator::count();
    $kurirCount = Kurir::count();

    $koordinatorMessage = "Koordinator: $koordinatorCount akun";
    $kurirMessage = "Kurir: $kurirCount akun";

    return response()->json([
        $koordinatorMessage,
        $kurirMessage,
    ]);
}

    public function koordinatorDashboard()
{
    $tanggalDistribusi = '2023-10-10'; //misal
    $tanggal = now()->toDateString();
    //setoran harian
    $totalPenjualanHarian = DataPenjualan::whereDate('tanggal_pengiriman', $tanggal)->sum('uang_setoran');
    
    //total pengiriman roti hari itu
    $totalPengirimanHariIni = TransaksiRoti::whereHas('transaksi', function ($query) use ($tanggalDistribusi) {
        $query->whereDate('tanggal_pengiriman', $tanggalDistribusi);
    })->sum('jumlah_roti');

    //total roti terjual hari itu
    $totalRotiDidistribusikan = TransaksiRoti::whereHas('transaksi', function ($query) use ($tanggalDistribusi) {
        $query->whereDate('tanggal_pengiriman', $tanggalDistribusi);
    })->sum('jumlah_roti');
    
    $totalRotiBasi = DataPenjualan::whereHas('transaksiRoti.transaksi', function ($query) use ($tanggalDistribusi) {
        $query->whereDate('tanggal_pengiriman', $tanggalDistribusi);
    })->sum('roti_basi');

    $totalRotiTerjual = $totalRotiDidistribusikan - $totalRotiBasi;

    //total lapak baru
    $lapakBaruHarian = Lapak::whereDate('created_at', $tanggal)->count();

    //setoran mingguan (diagram)
    $tanggalAwalMinggu = now()->startOfWeek(); // Mengambil awal minggu dari tanggal saat ini
    $totalSetoranMingguan = DataPenjualan::whereBetween('tanggal_pengiriman', [$tanggalAwalMinggu->toDateString(), $tanggal])->sum('uang_setoran');


    //setoran bulanam (diagram dan rata2)
    $tanggalAwalBulan = now()->startOfMonth(); // Mengambil awal bulan dari tanggal saat ini
    $totalSetoranBulanan = DataPenjualan::whereBetween('tanggal_pengiriman', [$tanggalAwalBulan->toDateString(), $tanggal])->sum('uang_setoran');


    return response()->json([
        'totalPenjualanHarian' => $totalPenjualanHarian,
        'totalPengirimanHariIni' => $totalPengirimanHariIni,
        'totalRotiTerjualHariIni' => $totalRotiTerjual,
        'lapakBaruHarian' => $lapakBaruHarian,
        'totalSetoranMingguan' => $totalSetoranMingguan,
        'totalSetoranBulanan' => $totalSetoranBulanan,
    ]);
}

}
