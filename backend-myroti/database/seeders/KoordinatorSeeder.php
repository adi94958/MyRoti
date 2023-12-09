<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class KoordinatorSeeder extends Seeder
{
    public function run()
    {
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
            ],
            [
                'username' => 'koordinator3',
                'password' => Crypt::encryptString('koordiantor3'),
                'nama' => 'Adinda',
                'user_type' => 'koordinator',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
