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
}
