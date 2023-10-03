<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataKurirController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\DataKoordinatorController;
use App\Http\Controllers\LapakController;
use App\Http\Controllers\DashboardController;


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
Route::get('/infologin', [AuthenticationController::class, 'infoLogin'])->middleware(['auth:sanctum']);

Route::middleware(['auth:sanctum', 'check.user.type:admin'])->group(function () {
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
});
Route::middleware(['auth:sanctum', 'check.user.type:koordinator'])->group(function () {
    // Koordinator routes here
    Route::get('/koordinator/lapak', [LapakController::class, 'readDataLapak']);
});
Route::middleware(['auth:sanctum', 'check.user.type:kurir'])->group(function () {
    // Kurir routes here
});

Route::middleware('auth:sanctum')->get('/logout', [AuthenticationController::class, 'logout']);
