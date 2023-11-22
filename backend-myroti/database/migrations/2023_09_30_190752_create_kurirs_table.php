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
        if (Schema::hasTable('areadistribusi')) {
            Schema::create('kurirs', function (Blueprint $table) {
                $table->id('id_kurir');
                $table->string('username')->unique();
                $table->string('password');
                $table->string('nama', 50);
                $table->string('user_type');
                $table->foreignId('area_id')->constrained(table: 'areadistribusi', indexName: 'area_id');
                $table->timestamps();
    
                //$table->foreign('area')->references('id')->on('area_distribusi');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kurirs');
    }


};
