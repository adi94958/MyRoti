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
        Schema::create('dataroti', function (Blueprint $table) {
            $table->bigIncrements('kode_roti');
            $table->string('nama_roti', 50);
            $table->integer('stok_roti');
            $table->string('rasa_roti', 50);
            $table->integer('harga_satuan_roti');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dataroti');
    }
};
