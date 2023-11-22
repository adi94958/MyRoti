<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DataPenjualan;
use Carbon\Carbon;

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
    public function getDataPerMinggu()
    {
        if (Carbon::now()->dayOfWeek !== Carbon::SUNDAY) {
            $sundayDate = Carbon::now()->next(Carbon::SUNDAY);
            Carbon::setTestNow($sundayDate);
        }

        $currentDayOfWeek = Carbon::now()->dayOfWeek;
        $daysSinceMonday = ($currentDayOfWeek + 7 - Carbon::MONDAY) % 7;
        $startDate = Carbon::now()->startOfWeek()->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        $salesData = DataPenjualan::selectRaw('DATE(tanggal_pengambilan) as date, COALESCE(SUM(uang_setoran), 0) as total_sales')
            ->whereBetween('tanggal_pengambilan', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Generate an array for each day within the specified range
        $datesInRange = [];
        $currentDate = $startDate->copy();
        while ($currentDate->lte($endDate)) {
            $dayName = $currentDate->englishDayOfWeek; // Mengambil nama hari dalam bahasa Inggris
            $dateString = $currentDate->toDateString();
            $salesForDate = $salesData->firstWhere('date', $dateString);
            $datesInRange[$dayName] = $salesForDate ? $salesForDate->total_sales : 0;
            $currentDate->addDay();
        }

        return response()->json($datesInRange, 200);
    }

    public function getDataPerbulan()
    {
        $currentYear = Carbon::now()->year;

        // Mengatur tanggal awal dan akhir untuk tahun saat ini
        $startDate = Carbon::create($currentYear, 1, 1)->startOfDay();
        $endDate = Carbon::create($currentYear, 12, 31)->endOfDay();

        $salesData = DataPenjualan::selectRaw('EXTRACT(MONTH FROM tanggal_pengambilan) as month, COALESCE(SUM(uang_setoran), 0) as total_sales')
            ->whereYear('tanggal_pengambilan', $currentYear)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Generate an array for each month within the specified range
        $monthsInRange = [];
        for ($month = 1; $month <= 12; $month++) {
            $salesForMonth = $salesData->firstWhere('month', $month);
            $monthName = Carbon::create($currentYear, $month, 1)->monthName; // Get month name
            $monthsInRange[$monthName] = $salesForMonth ? $salesForMonth->total_sales : 0;
        }

        return response()->json($monthsInRange, 200);
    }

    public function getOwnerIncome()
    {
        // Penghasilan
        $dailyIncome = number_format(DataPenjualan::whereDate('tanggal_pengambilan', today())->sum('uang_setoran'), 2, ',', '.');
        $monthlyIncome = number_format(DataPenjualan::whereMonth('tanggal_pengambilan', now()->month)->sum('uang_setoran'), 2, ',', '.');
        $yearlyIncome = number_format(DataPenjualan::whereYear('tanggal_pengambilan', now()->year)->sum('uang_setoran'), 2, ',', '.');
    
        // Rata-rata 
        $averageDailySales = number_format(DataPenjualan::whereDate('tanggal_pengambilan', today())->avg('uang_setoran'), 2, ',', '.');
        $averageMonthlySales = number_format(DataPenjualan::whereMonth('tanggal_pengambilan', now()->month)->avg('uang_setoran'), 2, ',', '.');
        $averageYearlySales = number_format(DataPenjualan::whereYear('tanggal_pengambilan', now()->year)->avg('uang_setoran'), 2, ',', '.');
    
        return response()->json([
            'daily_income' => "Rp " . $dailyIncome,
            'monthly_income' => "Rp " . $monthlyIncome,
            'yearly_income' => "Rp " . $yearlyIncome,
            'average_daily_sales' => "Rp " . $averageDailySales,
            'average_monthly_sales' => "Rp " . $averageMonthlySales,
            'average_yearly_sales' => "Rp " . $averageYearlySales,
        ], 200);
    }
    
}
