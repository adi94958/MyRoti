<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RotiBasi extends Model
{
    use HasFactory;
    protected $table = 'rotibasi'; 
    public $timestamps = false;
    protected $fillable = [
        'id_penjualan', 
        'kode_roti', 
        'jumlah_roti',
    ];

    public function penjualan()
    {
        return $this->belongsTo(DataPenjualan::class, 'id_penjualan', 'id_penjualan');
    }
    // Di dalam model RotiBasi
    public function roti()
    {
        return $this->belongsTo(Roti::class, 'kode_roti', 'kode_roti');
    }

}
