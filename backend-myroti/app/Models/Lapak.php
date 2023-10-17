<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Lapak extends Model
{
    use HasFactory;

    protected $table = 'lapak';
    protected $primaryKey = 'kode_lapak';
    protected $fillable = [
        'nama_lapak', 
        'area_id',
        'alamat_lapak',
    ];

    //hubungan PK ke FK
    public function Area_Distribusi(): BelongsTo
    {
        return $this->belongsTo(Area_Distribusi::class);
    }

    public function Transaksi(): HasMany
    {
        return $this->hasMany(Transaksi::class, 'kode_lapak', 'kode_lapak');
    }

    
    public function Kurir(): BelongsTo
    {
        return $this->belongsTo(Kurir::class, 'id_kurir');
    }
}
