<?php

namespace Database\Seeders;

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
        // DB::table('admins')->insert([
        //     'username' => 'admin2',
        //     'password' => Crypt::encryptString('admin2'),
        //     'user_type' => 'admin',
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        // ]);

        DB::table('kurirs')->insert([
            [
                'username' => 'kurir',
                'password' => Crypt::encryptString('kurir'),
                'nama' => 'Adrian',
                'area_id' => '1',
                'user_type' => 'kurir',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir2',
                'password' => Crypt::encryptString('kurir2'),
                'nama' => 'Fadel',
                'area_id' => '2',
                'user_type' => 'kurir',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
