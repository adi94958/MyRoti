<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Kurir extends Authenticatable
{
    use HasFactory, HasApiTokens;
    protected $table = 'kurirs';
    protected $primaryKey = 'id_kurir';
    protected $fillable = [
        'username', 
        'password', 
        'nama',
        'no_telp',
        'user_type',
        'area_id'
    ];

    public function Area_Distribusi(): BelongsTo
    {
        return $this->belongsTo(Area_Distribusi::class, 'area_id','area_id');
    }

    public function Lapak(): HasOne
    {
        return $this->hasOne(Lapak::class, 'id_kurir', 'id_kurir');
    }

    public function Transaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_kurir', 'id_kurir');
    }

    public function penghasilan()
    {
        return $this->hasMany(Penghasilan::class, 'id_kurir', 'id_kurir');
    }


}
