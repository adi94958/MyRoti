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
            $table->foreignId('id_penjualan')->constrained('datapenjualan', 'id_penjualan');
            $table->foreignId('kode_roti');
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
