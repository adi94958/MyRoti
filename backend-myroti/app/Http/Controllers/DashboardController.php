<?php

namespace App\Http\Controllers;

use App\Models\Kurir;
use App\Models\Koordinator;
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

}