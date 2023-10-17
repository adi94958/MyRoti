<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi';
    protected $primaryKey = 'id_transaksi';
    public $timestamps = false; // Atur menjadi false jika Anda tidak menggunakan kolom 'created_at' dan 'updated_at'.

    protected $fillable = [
        'kode_lapak',
        'kode_roti',
        'jumlah_roti',
        'id_kurir',
        'tanggal_pengiriman'
    ];

    public function Lapak(): BelongsTo
    {
        return $this->belongsTo(Lapak::class, 'kode_lapak', 'kode_lapak');
    }

    public function Roti(): BelongsTo
    {
        return $this->belongsTo(Roti::class, 'kode_roti', 'kode_roti');
    }

    public function dataPenjualan()
    {
        return $this->hasMany(DataPenjualan::class, 'id_transaksi', 'id_transaksi');
    }

}
