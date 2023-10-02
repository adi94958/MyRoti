<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Kurir extends Authenticatable
{
    use HasFactory, HasApiTokens;
    protected $fillable = [
        'username', 
        'password', 
        'nama',
        'user_type',
        'area'
    ];
}
