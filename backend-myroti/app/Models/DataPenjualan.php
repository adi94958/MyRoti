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
        'status',
        'bukti_pengiriman',
        'uang_setoran',
        'roti_basi',
        'catatan_penjual',
        'status_setor',
    ];
}
