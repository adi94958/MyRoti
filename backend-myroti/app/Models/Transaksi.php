<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi';
    protected $primaryKey = 'id_transaksi';
    public $timestamps = false; // Atur menjadi false jika Anda tidak menggunakan kolom 'created_at' dan 'updated_at'.

    protected $fillable = [
        'username',
        'kode_lapak',
        'tanggal_pengiriman',
        'status',
        'bukti_pengiriman',
    ];
//hubungan FK ke PM
    public function pengirim()
    {
        return $this->belongsTo(Kurir::class, 'username', 'username');
    }

    public function lapak()
    {
        return $this->belongsTo(Lapak::class, 'kode_lapak', 'kode_lapak');
    }

//hubungan PK ke FK
    public function transaksiRoti()
    {
        return $this->hasMany(TransaksiRoti::class, 'id_transaksi', 'id_transaksi');
    }

    public function dataPenjualan()
    {
        return $this->hasMany(DataPenjualan::class, 'id_transaksi', 'id_transaksi');
    }

}
