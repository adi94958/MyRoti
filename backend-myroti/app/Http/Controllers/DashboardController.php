<?php

namespace App\Http\Controllers;

use App\Models\Kurir;
use App\Models\Koordinator;
use App\Models\DataPenjualan;
use App\Models\Lapak;
use App\Models\TransaksiRoti;
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
    $tanggalDistribusi = now()->subDays(3)->toDateString();
    $tanggal = now()->toDateString();
    //setoran harian
    $totalPenjualanHarian = DataPenjualan::whereDate('tanggal_pengiriman', $tanggal)->sum('uang_setoran');
    
    //total pengiriman roti hari itu
    $totalPengirimanHariIni = DataPenjualan::whereDate('tanggal_pengiriman', $tanggal)->sum('');

    //total yang roti terjual hari itu
    //roti yang terjual adalah pengiriman - roti basi misal jarak pendistribusian 3 hari
    $totalRotiDidistribusikan = TransaksiRoti::whereHas('transaksi', function ($query) use ($tanggalDistribusi) {
        $query->whereDate('tanggal_pengiriman', $tanggalDistribusi);
    })->sum('jumlah_roti');
    
    $totalRotiBasi = DataPenjualan::where('tanggal_pengiriman', '>=', $tanggalDistribusi)
        ->where('tanggal_pengiriman', '<=', $tanggal)
        ->sum('roti_basi');

    $totalRotiTerjual = $totalRotiDidistribusikan - $totalRotiBasi;

    //total lapak baru
    $lapakBaruHarian = Lapak::whereDate('created_at', $tanggal)->count();

    //setoran mingguan (diagram)


    //setoran bulanam (diagram dan rata2)


    return response()->json([
        'totalPenjualanHarian' => $totalPenjualanHarian,
        'totalPengirimanHariIni' => $totalPengirimanHariIni,
        'totalRotiTerjualHariIni' => $totalRotiTerjual,
        'lapakBaruHarian' => $lapakBaruHarian,
        // Tambahkan data lain sesuai kebutuhan
    ]);
}

}
