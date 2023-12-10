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
        Schema::create('datapenjualan', function (Blueprint $table) {
            $table->bigIncrements('id_penjualan');
            $table->foreignId('id_transaksi')->nullable();
            $table->foreign('id_transaksi')->references('id_transaksi')->on('transaksi')->onDelete("cascade");
            $table->date('tanggal_pengambilan')->default(now());;
            $table->integer('total_harga')->nullable();
            $table->integer('total_dengan_rotibasi')->nullable();
            $table->integer('uang_setoran')->nullable();
            $table->text('catatan_penjual');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('datapenjualan');
    }
};
