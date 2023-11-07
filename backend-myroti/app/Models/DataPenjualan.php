<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataPenjualan extends Model
{
    use HasFactory;

    protected $table = 'datapenjualan'; 
    protected $primaryKey = 'id_penjualan'; 
    protected $fillable = [
        'id_transaksi',
        'tanggal_pengiriman',
        'bukti_pengiriman',
        'uang_setoran',
        'catatan_penjual',
    ];

    //hubungan FK ke PM
    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi', 'id_transaksi');
    }



}
