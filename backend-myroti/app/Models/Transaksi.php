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

    public function pengirim()
    {
        return $this->belongsTo(Kurir::class, 'username', 'username');
    }

}
