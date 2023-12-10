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
        Schema::create('kurirs', function (Blueprint $table) {
            $table->id('id_kurir');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('nama', 50);
            $table->string('user_type');
            $table->string('no_telp', 15)->nullable();
            $table->foreignId('area_id')->nullable();
            $table->foreign('area_id')->references('area_id')->on('areadistribusi')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kurir');
    }
};
