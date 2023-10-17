<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Roti extends Model
{
    use HasFactory;

    protected $table = 'dataroti';
    protected $primaryKey = 'kode_roti';
    protected $fillable = [
        'nama_roti', 
        'stok_roti',
        'rasa_roti',
        'harga_satuan_roti',
    ];

    public function Transaksi(): HasMany
    {
        return $this->hasMany(Transaksi::class, 'kode_roti', 'kode_roti');
    }

}
