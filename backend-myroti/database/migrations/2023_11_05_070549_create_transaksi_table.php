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
        Schema::create('transaksi', function (Blueprint $table) {
            $table->bigIncrements('id_transaksi');       
            $table->foreignId('kode_lapak')->constrained('lapak', 'kode_lapak');
            $table->integer('id_kurir');    
            $table->string('bukti_pengiriman')->nullable();
            $table->timestamp('tanggal_pengiriman')->default(now());
            $table->enum('status', ['ready', 'on delivery', 'delivered', 'finished']);  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
