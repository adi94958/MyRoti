<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DataKurirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('datakurir')->insert([
            [
            'username' => 'alyawulanresa',
            'name' => 'alya wulan resa',
            'password' => Hash::make('inipassword'),
            ],
        ]);
    }
}
