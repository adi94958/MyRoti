<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\KeuanganController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataKurirController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\DataKoordinatorController;
use App\Http\Controllers\LapakController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataRotiController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\DataKeuanganController;
use App\Http\Controllers\DataPemilikController;
use App\Http\Controllers\PemilikController;
use App\Http\Controllers\PenjualanController;
use App\Http\Controllers\RekomendasiController;
use App\Http\Controllers\RiwayatTransaksiController;

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

Route::get('/keuangan', [DataKeuanganController::class, 'readDataKeuangan']);
Route::post('/keuangan/registrasi', [DataKeuanganController::class, 'registerKeuangan']);
Route::put('/keuangan/update/{id}', [DataKeuanganController::class, 'updateKeuangan']);
Route::delete('/keuangan/delete/{id}', [DataKeuanganController::class, 'deleteKeuangan']);


// Koordinator routes here
Route::get('/koordinator/lapak', [LapakController::class, 'readDataLapak']);
Route::post('/koordinator/lapak/registrasi', [LapakController::class, 'registerLapak']);
Route::put('/koordinator/lapak/update/{id}', [LapakController::class, 'updateLapak']);
Route::delete('/koordinator/lapak/delete/{id}', [LapakCOntroller::class, 'deleteLapak']);

Route::get('/koordinator/dataroti', [DataRotiController::class, 'readDataRoti']);
Route::post('/koordinator/dataroti/registrasi', [DataRotiController::class, 'registerRoti']);
Route::put('/koordinator/dataroti/update/{id}', [DataRotiController::class, 'updateRoti']);
Route::delete('/koordinator/dataroti/delete/{id}', [DataRotiController::class, 'deleteRoti']);

Route::get('/koordinator/transaksi', [TransaksiController::class, 'lapakTransaksi']);
Route::get('/koordinator/listtransaksi', [TransaksiController::class, 'readTransaksi']);
Route::post('/koordinator/transaksi/create/{id}', [TransaksiController::class, 'createTransaksi']);
Route::delete('/koordinator/transaksi/delete/{id_transaksi}', [TransaksiController::class, 'deleteTransaksi']);
Route::get('/koordinator/{path}', [TransaksiController::class, 'getImage']);

Route::get('/rekomendasi', [RekomendasiController::class, 'readRiwayatPenjualan']);

Route::get('/area', [AreaController::class, 'readArea']);

Route::get('/pemilik', [DataPemilikController::class, 'readDataPemilik']);
Route::post('/pemilik/registrasi', [DataPemilikController::class, 'registerPemilik']);
Route::put('/pemilik/update/{id}', [DataPemilikController::class, 'updatePemilik']);
Route::delete('/pemilik/delete/{id}', [DataPemilikController::class, 'deletePemilik']);

Route::get('/kurir/transaksi', [TransaksiController::class, 'TransaksiKurir']);
Route::put('/kurir/transaksi/{id}', [TransaksiController::class, 'kurirDeliver']);
Route::post('/kurir/transaksi/{id}', [TransaksiController::class, 'uploadBukti']);
Route::get('/kurir/transaksi/{id}', [PenjualanController::class, 'totalharga']);
Route::post('/kurir/penjualan/{id}', [PenjualanController::class, 'createPenjualan']);

// Kurir routes here

Route::get('/kurir/riwayat', [RiwayatTransaksiController::class, 'RiwayatTransaksiKurir']);


Route::get('/kurir/riwayat-transaksi/{id}', [RiwayatTransaksiController::class, 'detailRoti']);
Route::get('/kurir/datapenjualan', [RiwayatTransaksiController::class, 'readDataPenjualan']);
Route::get('/kurir/penghasilan/{id}', [DataKurirController::class, 'getPenghasilan']);
Route::get('/kurir/edit/{id}', [DataKurirController::class, 'getDataKurir']);

// Keuangan routes here
Route::get('/keuangan/kurir', [KeuanganController::class, 'getDataKeuangan']);

// Pemilik routes here
Route::get('/pemilik/income', [PemilikController::class, 'getOwnerIncome']);
Route::get('/pemilik/minggu', [PemilikController::class, 'getDataPerMinggu']);
Route::get('/pemilik/bulan', [PemilikController::class, 'getDataPerBulan']);
