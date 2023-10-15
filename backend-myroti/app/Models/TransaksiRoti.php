<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiRoti extends Model
{
    use HasFactory;
    protected $table = 'transaksi_roti'; 
    protected $primaryKey = 'id_transaksi_roti'; 
    protected $fillable = [
        'id_transaksi', 
        'kode_roti', 
        'id_penjualan',
        'jumlah_roti',
    ];

    //hubungan FK ke PM
    public function penjualan()
    {
        return $this->belongsTo(DataPenjualan::class, 'id_penjualan', 'id_penjualan');
    }

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi', 'id_transaksi');
    }

    public function roti()
    {
        return $this->belongsTo(Roti::class, 'kode_roti', 'kode_roti');
    }
}
