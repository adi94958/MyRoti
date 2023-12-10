<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('keuangans')->insert([
            'username' => 'keuangan',
            'password' => Crypt::encryptString('keuangan'),
            'nama' => 'Adrian',
            'user_type' => 'keuangan',
            'created_at' => Carbon::now()->subDays(15),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('pemiliks')->insert([
            'username' => 'pemilik',
            'password' => Crypt::encryptString('pemilik'),
            'nama' => 'Adnan',
            'user_type' => 'pemilik',
            'created_at' => Carbon::now()->subDays(10),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('admins')->insert([
            'username' => 'admin',
            'password' => Crypt::encryptString('admin'),
            'user_type' => 'admin',
            'created_at' => Carbon::now()->subDays(15),
            'updated_at' => Carbon::now(),
        ]);
    }
}
