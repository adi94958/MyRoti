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
        Schema::create('penghasilan', function (Blueprint $table) {
            $table->bigIncrements('id_penghasilan');
            $table->integer('id_kurir')->constrained('kurirs', 'id_kurir');  
            $table->date('tanggal_pengiriman')->default(now());
            $table->float('penghasilan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penghasilan');
    }
};
