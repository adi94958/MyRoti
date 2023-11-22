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
        if (!Schema::hasTable('transaksi')) {
            Schema::create('transaksi', function (Blueprint $table) {  
                $table->bigIncrements('id_transaksi');       
                $table->foreignId('kode_lapak')->constrained('lapak', 'kode_lapak');
                $table->string('kode_roti');
                $table->integer('jumlah_roti');  
                $table->timestamp('tanggal_pengiriman')->default(now());
                   
            });
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
