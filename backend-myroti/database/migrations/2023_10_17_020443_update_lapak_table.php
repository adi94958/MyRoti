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
        Schema::table('lapak', function (Blueprint $table) {
            $table->foreignId('id_kurir')->constrained('kurirs', 'id_kurir');
            $table->foreignId('area_id')->constrained('areadistribusi', 'area_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
