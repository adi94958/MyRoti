<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataPenjualan extends Model
{
    use HasFactory;

    protected $table = 'datapenjualan'; 
    protected $primaryKey = 'id_penjualan'; 
    public $timestamps = false;
    protected $fillable = [
        'id_transaksi',
        'tanggal_pengambilan',
        'total_harga',
        'total_dengan_rotibasi',
        'uang_setoran',
        'catatan_penjual'
    ];

    //hubungan FK ke PM
    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi', 'id_transaksi');
    }

    public function rotibasi()
    {
        return $this->hasMany(RotiBasi::class, 'id_penjualan', 'id_penjualan');
    }


}
