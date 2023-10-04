<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admins')->insert([
            'username' => 'admin',
            'password' => Crypt::encryptString('admin'),
            'user_type' => 'admin',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('koordinators')->insert([
            [
            'username' => 'koordinator',
            'password' => Crypt::encryptString('koordinator'),
            'nama' => 'Adi',
            'user_type' => 'koordinator',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ],
        [
            'username' => 'koordinator2',
            'password' => Crypt::encryptString('koordiantor2'),
            'nama' => 'Alya',
            'user_type' => 'koordinator',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]
        ]);
        DB::table('kurirs')->insert([
            [
                'username' => 'kurir',
                'password' => Crypt::encryptString('kurir'),
                'nama' => 'Adrian',
                'area' => 'Bandung Barat',
                'user_type' => 'kurir',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir2',
                'password' => Crypt::encryptString('kurir2'),
                'nama' => 'Fadel',
                'area' => 'Cimahi',
                'user_type' => 'kurir',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
