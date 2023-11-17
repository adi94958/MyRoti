<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DataPenjualan;

class PemilikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
//     public function getOwnerTransactions(Request $request)
// {
//     $transactions = Transaksi::with('lapak', 'dataPenjualan')->orderBy($request->sort_column, $request->sort_order)->get();

//     return response()->json(['transactions' => $transactions], 200);
// }


// public function getTopSellingStalls()
// {
//     $topSellingStalls = Lapak::withCount(['transaksi' => function ($query) {
//         $query->has('dataPenjualan');
//     }])->orderByDesc('transaksi_count')->first();

//     return response()->json(['top_selling_stalls' => $topSellingStalls], 200);
// }

public function getOwnerIncome()
{
    // Penghasilan
    $dailyIncome = DataPenjualan::whereDate('tanggal_pengambilan', today())->sum('uang_setoran');

    $monthlyIncome = DataPenjualan::whereMonth('tanggal_pengambilan', now()->month)->sum('uang_setoran');

    $yearlyIncome = DataPenjualan::whereYear('tanggal_pengambilan', now()->year)->sum('uang_setoran');
    
    // Rata-rata 
    $averageDailySales = DataPenjualan::whereDate('tanggal_pengambilan', today())->avg('uang_setoran');

    $averageMonthlySales = DataPenjualan::whereMonth('tanggal_pengambilan', now()->month)->avg('uang_setoran');

    $averageYearlySales = DataPenjualan::whereYear('tanggal_pengambilan', now()->year)->avg('uang_setoran');

    return response()->json([
        'daily_income' => number_format($dailyIncome, 2, '.', ''),
        'monthly_income' => number_format($monthlyIncome, 2, '.', ''),
        'yearly_income' => number_format($yearlyIncome, 2, '.', ''),
        'average_daily_sales' => number_format($averageDailySales, 2, '.', ''),
        'average_monthly_sales' => number_format($averageMonthlySales, 2, '.', ''),
        'average_yearly_sales' => number_format($averageYearlySales, 2, '.', ''),
    ], 200);
}
}
