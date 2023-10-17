<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Area_Distribusi extends Model
{
    use HasFactory;

    protected $table = 'areadistribusi';
    protected $primaryKey = 'area_id'; 
    protected $fillable = [
        'area_distribusi'
    ];

    public function Kurir(): HasOne
    {
        return $this->hasOne(Kurir::class, 'area_id', 'area_id');
    }

    public function Lapak(): HasOne
    {
        return $this->hasOne(Lapak::class, 'area_id', 'area_id');
    }
}
