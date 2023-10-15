<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lapak extends Model
{
    use HasFactory;

    protected $table = 'lapak';
    protected $primaryKey = 'kode_lapak';
    protected $fillable = [
        'nama_lapak', 
        'area',
        'alamat_lapak',
    ];

    //hubungan PK ke FK
    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'kode_lapak', 'kode_lapak');
    }
}
