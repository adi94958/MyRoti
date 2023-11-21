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
            $table->foreignId('id_transaksi')->constrained('transaksi', 'id_transaksi');
            $table->timestamp('tanggal_pengambilan')->default(now());;
            $table->decimal('total_harga', 15)->nullable();
            $table->decimal('total_dengan_rotibasi', 15)->nullable();
            $table->decimal('uang_setoran', 15)->nullable();
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
