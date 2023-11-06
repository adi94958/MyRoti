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
        Schema::create('lapak', function (Blueprint $table) {
            $table->bigIncrements('kode_lapak');
            $table->string('nama_lapak', 50);
            $table->string('alamat_lapak', 100);
            $table->string('no_telp', 15)->nullable();
            $table->foreignId('id_kurir')->constrained('kurirs', 'id_kurir');
            $table->foreignId('area_id')->constrained('areadistribusi', 'area_id');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lapak');
    }
};
