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
                $table->bigIncrements('id_transaksi_roti');
                $table->unsignedBigInteger('id_transaksi')->nullable();
                $table->bigInteger('kode_roti')->nullable();
                $table->unsignedBigInteger('id_penjualan');
                $table->integer('jumlah_roti');
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
