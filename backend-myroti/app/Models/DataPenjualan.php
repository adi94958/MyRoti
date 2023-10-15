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

    //hubungan FK ke PM
    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi', 'id_transaksi');
    }

    //hubungan PM ke FK
    public function transaksiRoti()
    {
        return $this->hasMany(TransaksiRoti::class, 'id_penjualan', 'id_penjualan');
    }


}
