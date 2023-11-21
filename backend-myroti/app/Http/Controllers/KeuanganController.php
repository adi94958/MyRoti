<?php

namespace App\Http\Controllers;

use App\Models\Kurir;
use Carbon\Carbon;

class KeuanganController extends Controller
{
    public function getDataKeuangan()
    {
        $today = Carbon::today()->toDateString();

        $datas = Kurir::with([
            'penghasilan' => function ($query) use ($today) {
                $query->whereDate('tanggal_pengiriman', $today);
            },
            'transaksi' => function ($query) use ($today) {
                $query->whereDate('tanggal_pengiriman', $today)
                    ->where('status', 'finished')
                    ->with('lapak', 'dataPenjualan');
            }
        ])
            ->get();

        $datas = $datas->map(function ($item) {
            $item->penghasilan->transform(function ($penghasilan) { 
                $penghasilan->penghasilan = 'Rp ' . number_format($penghasilan->penghasilan, 2);
                return $penghasilan;
            });

            $item->transaksi->transform(function ($transaksi) {
                if ($transaksi->dataPenjualan) {
                    $transaksi->dataPenjualan->uang_setoran = 'Rp ' . number_format($transaksi->dataPenjualan->uang_setoran, 2);
                }
                return $transaksi;
            });
    
            return $item;
        });

        return response()->json($datas, 200);
    }
}