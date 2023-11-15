<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LapakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('lapak')->insert([
        [
            'nama_lapak' => 'Lapak A',
            'area_id' => 1,
            'alamat_lapak' => 'Alamat Lapak A',
            'created_at' => Carbon::now()->subDays(1)->toDateTimeString(),
            'id_kurir' => 1,
            'status' => 'enable',
        ],
        [
            'nama_lapak' => 'Lapak B',
            'area_id' => 2,
            'alamat_lapak' => 'Alamat Lapak B',
            'created_at' => Carbon::now()->subDays(2)->toDateTimeString(),
            'id_kurir' => 3,
            'status' => 'enable',
        ],
        [
            'nama_lapak' => 'Lapak C',
            'area_id' => 3,
            'alamat_lapak' => 'Alamat Lapak C',
            'created_at' => Carbon::now()->subDays(3)->toDateTimeString(),
            'id_kurir' => 5,
            'status' => 'enable',
        ],
        [
            'nama_lapak' => 'Lapak D',
            'area_id' => 4,
            'alamat_lapak' => 'Alamat Lapak D',
            'created_at' => Carbon::now()->subDays(4)->toDateTimeString(),
            'id_kurir' => 7,
            'status' => 'enable',
        ],
        [
            'nama_lapak' => 'Lapak E',
            'area_id' => 5,
            'alamat_lapak' => 'Alamat Lapak E',
            'created_at' => Carbon::now()->subDays(5)->toDateTimeString(),
            'id_kurir' => 9,
            'status' => 'enable',
        ],
        [
            'nama_lapak' => 'Lapak F',
            'area_id' => 6,
            'alamat_lapak' => 'Alamat Lapak F',
            'created_at' => Carbon::now()->subDays(6)->toDateTimeString(),
            'id_kurir' => 11,
            'status' => 'enable',
        ],
        [
            'nama_lapak' => 'Lapak G',
            'area_id' => 7,
            'alamat_lapak' => 'Alamat Lapak G',
            'created_at' => Carbon::now()->subDays(7)->toDateTimeString(),
            'id_kurir' => 12,
            'status' => 'enable',
        ],
        [
            'nama_lapak' => 'Lapak H',
            'area_id' => 8,
            'alamat_lapak' => 'Alamat Lapak H',
            'created_at' => Carbon::now()->subDays(8)->toDateTimeString(),
            'id_kurir' => 13,
            'status' => 'enable',
        ],
        [
            'nama_lapak' => 'Lapak I',
            'area_id' => 9,
            'alamat_lapak' => 'Alamat Lapak I',
            'created_at' => Carbon::now()->subDays(9)->toDateTimeString(),
            'id_kurir' => 14,
            'status' => 'enable',
        ],
        [
            'nama_lapak' => 'Lapak J',
            'area_id' => 10,
            'alamat_lapak' => 'Alamat Lapak J',
            'created_at' => Carbon::now()->subDays(10)->toDateTimeString(),
            'id_kurir' => 15,
            'status' => 'enable',
        ]
        ]);
    }
}
