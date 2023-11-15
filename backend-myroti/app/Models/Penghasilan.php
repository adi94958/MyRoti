<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penghasilan extends Model
{
    use HasFactory;

    protected $table = 'penghasilan'; 
    public $timestamps = false;
    protected $primaryKey = 'id_penghasilan';
    protected $fillable = [ 
        'id_kurir', 
        'penghasilan',
        'tanggal_pengiriman',
    ];

    public function Kurir()
    {
        return $this->belongsTo(Kurir::class, 'id_kurir', 'id_kurir');
    }

}
