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
        Schema::create('transaksi_roti', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_transaksi')->nullable();
            $table->foreign('id_transaksi')->references('id_transaksi')->on('transaksi')->onDelete("cascade");
            $table->foreignId('kode_roti')->nullable();
            $table->foreign('kode_roti')->references('kode_roti')->on('dataroti')->onDelete('set null');
            $table->integer('jumlah_roti');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksiroti');
    }
};
