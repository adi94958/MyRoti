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
        Schema::create('rotibasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_penjualan')->nullable();
            $table->foreign('id_penjualan')->references('id_penjualan')->on('datapenjualan')->onDelete("cascade");
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
        Schema::dropIfExists('rotibasi');
    }
};
