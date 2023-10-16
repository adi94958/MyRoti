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
    
        $koordinatorMessage = "$koordinatorCount akun";
        $kurirMessage = "$kurirCount akun";
    
        return response()->json([
            'koordinator' => $koordinatorMessage,
            'kurir' => $kurirMessage,
        ]);
    }

    public function koordinatorDashboard()
{
    //misal $tanggalDistribusi = '2023-10-10'; 
    $tanggalDistribusi = now()->subDay(1)->toDateString();
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
    $tanggalAkhirMinggu = now()->endOfWeek(); // Mengambil akhir minggu dari tanggal saat ini
    $totalSetoranMingguan = DataPenjualan::whereBetween('tanggal_pengiriman', [$tanggalAwalMinggu, $tanggalAkhirMinggu])->sum('uang_setoran');
    

    //setoran bulanam (diagram dan rata2)
    $tahun = now()->year;
    $tanggalAwalTahun = "$tahun-01-01";
    $tanggalAkhirTahun = "$tahun-12-31";

    $totalPenjualanBulanan = DataPenjualan::whereBetween('tanggal_pengiriman', [$tanggalAwalTahun, $tanggalAkhirTahun])
    ->selectRaw("to_char(tanggal_pengiriman, 'Month') as bulan, SUM(uang_setoran) as total_setoran")
    ->groupBy('bulan')
    ->orderBy('bulan')
    ->get();

    //rata2 perbulanya
    $totalSetoranTahunan = 0;
    // Loop melalui hasil query
    foreach ($totalPenjualanBulanan as $data) {
        $totalSetoranTahunan += $data->total_setoran;
    }

    // Menghitung jumlah bulan
    $jumlahBulan = count($totalPenjualanBulanan);
    

    // Menghitung rata-rata setoran per bulan
    $rataRataSetoranBulanan = ($jumlahBulan > 0) ? number_format($totalSetoranTahunan / $jumlahBulan, 2) : 0;


    return response()->json([
        'totalPenjualanHarian' => $totalPenjualanHarian,
        'totalPengirimanHariIni' => $totalPengirimanHariIni,
        'totalRotiTerjualHariIni' => $totalRotiTerjual,
        'lapakBaruHarian' => $lapakBaruHarian,
        'totalSetoranMingguan' => $totalSetoranMingguan,
        'dataPenjualanBulanan' => $totalPenjualanBulanan,
        'Rata-rata pertahun' => $rataRataSetoranBulanan,
    ]);
}

}
