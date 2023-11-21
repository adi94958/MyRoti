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
    public $timestamps = false;

    protected $fillable = [
        'kode_lapak',
        'id_kurir',
        'tanggal_pengiriman',
        'bukti_pengiriman',
        'status'
    ];

    public function Lapak(): BelongsTo
    {
        return $this->belongsTo(Lapak::class, 'kode_lapak', 'kode_lapak');
    }

    // public function Kurir(): BelongsTo
    // {
    //     return $this->belongsTo(Kurir::class, 'id_kurir', 'id_kurir');
    // }

    public function dataPenjualan()
    {
        return $this->hasOne(DataPenjualan::class, 'id_transaksi', 'id_transaksi');
    }

    public function transaksi_roti()
    {
        return $this->hasMany(TransaksiRoti::class, 'id_transaksi', 'id_transaksi');
    }

}
