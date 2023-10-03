<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roti extends Model
{
    use HasFactory;
    protected $table = 'dataroti';
    protected $fillable = [
        'nama_roti', 
        'stok_roti',
        'rasa_roti',
        'harga_satuan_roti',
    ];
}
