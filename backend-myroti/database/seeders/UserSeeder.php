<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
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
        DB::table('admins')->insert([
            'username' => 'admin2',
            'password' => Crypt::encryptString('admin2'),
            'user_type' => 'admin',
            'created_at' => Carbon::now()->subDays(15),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('kurirs')->insert([
            [
                'username' => 'kurir',
                'password' => Crypt::encryptString('kurir'),
                'nama' => 'Adrian',
                'area_id' => '1',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(14),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir2',
                'password' => Crypt::encryptString('kurir2'),
                'nama' => 'Fadel',
                'area_id' => '1',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(14),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir3',
                'password' => Crypt::encryptString('kurir3'),
                'nama' => 'Budi',
                'area_id' => '2',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir4',
                'password' => Crypt::encryptString('kurir4'),
                'nama' => 'Citra',
                'area_id' => '2',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir5',
                'password' => Crypt::encryptString('kurir5'),
                'nama' => 'David',
                'area_id' => '3',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir6',
                'password' => Crypt::encryptString('kurir6'),
                'nama' => 'Eva',
                'area_id' => '3',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir7',
                'password' => Crypt::encryptString('kurir7'),
                'nama' => 'Farhan',
                'area_id' => '4',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir8',
                'password' => Crypt::encryptString('kurir8'),
                'nama' => 'Gita',
                'area_id' => '4',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir9',
                'password' => Crypt::encryptString('kurir9'),
                'nama' => 'Hadi',
                'area_id' => '5',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir10',
                'password' => Crypt::encryptString('kurir10'),
                'nama' => 'Ika',
                'area_id' => '5',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir11',
                'password' => Crypt::encryptString('kurir11'),
                'nama' => 'Joko',
                'area_id' => '6',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir12',
                'password' => Crypt::encryptString('kurir12'),
                'nama' => 'Kemal',
                'area_id' => '7',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir13',
                'password' => Crypt::encryptString('kurir13'),
                'nama' => 'Lia',
                'area_id' => '8',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir14',
                'password' => Crypt::encryptString('kurir14'),
                'nama' => 'Mira',
                'area_id' => '9',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir15',
                'password' => Crypt::encryptString('kurir15'),
                'nama' => 'Nina',
                'area_id' => '10',
                'user_type' => 'kurir',
                'created_at' => now()->subDays(3),
                'updated_at' => now(),
            ]
        ]);
    }
}
