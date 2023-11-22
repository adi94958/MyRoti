<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Keuangan extends Authenticatable
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
