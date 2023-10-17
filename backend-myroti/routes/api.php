<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataKurirController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\DataKoordinatorController;
use App\Http\Controllers\LapakController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataRotiController;
use App\Http\Controllers\TransaksiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthenticationController::class, 'login']);

// Admin routes here
Route::get('/dashboard/admin', [DashboardController::class, 'adminDashboard']);
Route::get('/koordinator', [DataKoordinatorController::class, 'readDataKoordinator']);
Route::post('/koordinator/registrasi', [DataKoordinatorController::class, 'registerKoordinator']);
Route::put('/koordinator/update/{id}', [DataKoordinatorController::class, 'updateKoordinator']);
Route::delete('/koordinator/delete/{id}', [DataKoordinatorController::class, 'deleteKoordinator']);

Route::get('/kurir', [DataKurirController::class, 'readDataKurir']);
Route::post('/kurir/registrasi', [DataKurirController::class, 'registerKurir']);
Route::put('/kurir/update/{id}', [DataKurirController::class, 'updateKurir']);
Route::delete('/kurir/delete/{id}', [DataKurirController::class, 'deleteKurir']);

// Koordinator routes here
Route::get('/dashboard/koordinator', [DashboardController::class, 'koordinatorDashboard']);
Route::get('/koordinator/lapak', [LapakController::class, 'readDataLapak']);
Route::post('/koordinator/lapak/registrasi', [LapakController::class, 'registerLapak']);
Route::put('/koordinator/lapak/update/{id}', [LapakController::class, 'updateLapak']);
Route::delete('/koordinator/lapak/delete/{id}', [LapakCOntroller::class, 'deleteLapak']);

Route::get('/koordinator/dataroti', [DataRotiController::class, 'readDataRoti']);
Route::post('/koordinator/dataroti/registrasi', [DataRotiController::class, 'registerRoti']);
Route::put('/koordinator/dataroti/update/{id}', [DataRotiController::class, 'updateRoti']);
Route::delete('/koordinator/dataroti/delete/{id}', [DataRotiController::class, 'deleteRoti']);

Route::get('/koordinator/transaksi', [TransaksiController::class, 'readTransaksi']);
Route::post('/koordinator/transaksi/create', [TransaksiController::class, 'createTransaksi']);

// Kurir routes here