<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiRoti extends Model
{
    use HasFactory;
    protected $table = 'transaksi_roti'; 
    public $timestamps = false;
    protected $fillable = [
        'id_transaksi', 
        'kode_roti', 
        'jumlah_roti',
    ];

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi', 'id_transaksi');
    }

    public function roti()
    {
        return $this->belongsTo(Roti::class, 'kode_roti', 'kode_roti');
    }
}