<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Keuangan extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = 'keuangans';
    protected $fillable = [
        'username', 
        'password', 
        'nama',
        'user_type'
    ];
}
