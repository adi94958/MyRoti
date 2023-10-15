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
            $table->id();
            $table->string('username', 225)->collation('pg_catalog.default');
            $table->bigInteger('kode_lapak')->nullable();
            $table->timestamp('tanggal_pengiriman')->default(now());
            $table->string('status', 225)->collation('pg_catalog.default');
            $table->text('bukti_pengiriman')->collation('pg_catalog.default');
            $table->primary('id_transaksi');
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
