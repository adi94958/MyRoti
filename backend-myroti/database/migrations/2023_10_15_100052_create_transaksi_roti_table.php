<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('transaksi_roti')) {
        Schema::create('transaksi_roti', function (Blueprint $table) {
            $table->id();
            $table->integer('id_transaksi')->nullable();
            $table->bigInteger('kode_roti')->nullable();
            $table->integer('id_penjualan');
            $table->integer('jumlah_roti');
            $table->primary('id_transaksi_roti');
            $table->foreign('id_penjualan')->references('id_penjualan')->on('datapenjualan');
            $table->foreign('id_transaksi')->references('id_transaksi')->on('transaksi');
        });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_roti');
    }
};
