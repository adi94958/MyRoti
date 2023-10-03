<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lapak extends Model
{
    use HasFactory;

    protected $table = 'lapak';
    protected $fillable = [
        'nama_lapak', 
        'id_area_distribusi',
        'alamat_lapak',
    ];

}
