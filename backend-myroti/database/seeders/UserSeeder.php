<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admins')->insert([
            'username' => 'aruya',
            'password' => Hash::make('aruya123'),
            'user_type' => 'admin',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('koordinators')->insert([
            [
            'username' => 'koordinator',
            'password' => Hash::make('123'),
            'nama' => 'Adi',
            'user_type' => 'koordinator',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ],
        [
            'username' => 'koordinator2',
            'password' => Hash::make('456'),
            'nama' => 'Alya',
            'user_type' => 'koordinator',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]
        ]);
        DB::table('kurirs')->insert([
            [
                'username' => 'kurir2',
                'password' => Hash::make('123456'),
                'nama' => 'Adrian',
                'area' => 'Bandung Barat',
                'user_type' => 'kurir',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir3',
                'password' => Hash::make('123456'),
                'nama' => 'Fadel',
                'area' => 'Cimahi',
                'user_type' => 'kurir',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
