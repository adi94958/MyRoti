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
        if (!Schema::hasTable('datapenjualan')) {
        Schema::create('datapenjualan', function (Blueprint $table){
            $table->bigIncrements('id_penjualan');
            $table->integer('id_transaksi');
            $table->timestamp('tanggal_pengiriman')->useCurrent();
            $table->string('status', 100);
            $table->text('bukti_pengiriman');
            $table->decimal('uang_setoran', 15, 2);
            $table->integer('roti_basi');
            $table->text('catatan_penjual');
            $table->string('status_setor', 15);
        });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('datapenjualan');
    }
};
