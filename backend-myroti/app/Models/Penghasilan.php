<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penghasilan extends Model
{
    use HasFactory;

    protected $table = 'penghasilan'; 
    public $timestamps = false;
    protected $fillable = [
        'id_penjualan', 
        'id_kurir', 
        'penghasilan',
    ];

    public function penjualan()
    {
        return $this->belongsTo(DataPenjualan::class, 'id_penjualan', 'id_penjualan');
    }

}
