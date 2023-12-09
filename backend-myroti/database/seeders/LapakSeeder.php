<?php

namespace Database\Seeders;

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
                'no_telp' => '08123456789',
                'created_at' => Carbon::now()->subDays(1)->toDateTimeString(),
                'id_kurir' => 1,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak B',
                'area_id' => 2,
                'alamat_lapak' => 'Alamat Lapak B',
                'no_telp' => '08123456788',
                'created_at' => Carbon::now()->subDays(2)->toDateTimeString(),
                'id_kurir' => 3,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak C',
                'area_id' => 3,
                'alamat_lapak' => 'Alamat Lapak C',
                'no_telp' => '08123456787',
                'created_at' => Carbon::now()->subDays(3)->toDateTimeString(),
                'id_kurir' => 5,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak D',
                'area_id' => 4,
                'alamat_lapak' => 'Alamat Lapak D',
                'no_telp' => '08123456786',
                'created_at' => Carbon::now()->subDays(4)->toDateTimeString(),
                'id_kurir' => 7,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak E',
                'area_id' => 5,
                'alamat_lapak' => 'Alamat Lapak E',
                'no_telp' => '08123456785',
                'created_at' => Carbon::now()->subDays(5)->toDateTimeString(),
                'id_kurir' => 9,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak F',
                'area_id' => 6,
                'alamat_lapak' => 'Alamat Lapak F',
                'no_telp' => '08123456784',
                'created_at' => Carbon::now()->subDays(6)->toDateTimeString(),
                'id_kurir' => 11,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak G',
                'area_id' => 7,
                'alamat_lapak' => 'Alamat Lapak G',
                'no_telp' => '08123456783', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(7)->toDateTimeString(),
                'id_kurir' => 12,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak H',
                'area_id' => 8,
                'alamat_lapak' => 'Alamat Lapak H',
                'no_telp' => '08123456782', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(8)->toDateTimeString(),
                'id_kurir' => 13,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak I',
                'area_id' => 9,
                'alamat_lapak' => 'Alamat Lapak I',
                'no_telp' => '08123456781', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(9)->toDateTimeString(),
                'id_kurir' => 14,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak J',
                'area_id' => 10,
                'alamat_lapak' => 'Alamat Lapak J',
                'no_telp' => '08123456780', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(10)->toDateTimeString(),
                'id_kurir' => 15,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak K',
                'area_id' => 11,
                'alamat_lapak' => 'Alamat Lapak K',
                'no_telp' => '08123456779', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(11)->toDateTimeString(),
                'id_kurir' => 2,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak L',
                'area_id' => 12,
                'alamat_lapak' => 'Alamat Lapak L',
                'no_telp' => '08123456778', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(12)->toDateTimeString(),
                'id_kurir' => 4,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak M',
                'area_id' => 13,
                'alamat_lapak' => 'Alamat Lapak M',
                'no_telp' => '08123456777', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(13)->toDateTimeString(),
                'id_kurir' => 6,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak N',
                'area_id' => 14,
                'alamat_lapak' => 'Alamat Lapak N',
                'no_telp' => '08123456776', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(14)->toDateTimeString(),
                'id_kurir' => 8,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak O',
                'area_id' => 15,
                'alamat_lapak' => 'Alamat Lapak O',
                'no_telp' => '08123456775', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(15)->toDateTimeString(),
                'id_kurir' => 10,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak P',
                'area_id' => 16,
                'alamat_lapak' => 'Alamat Lapak P',
                'no_telp' => '08123456774', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(16)->toDateTimeString(),
                'id_kurir' => 16,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak Q',
                'area_id' => 17,
                'alamat_lapak' => 'Alamat Lapak Q',
                'no_telp' => '08123456773', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(17)->toDateTimeString(),
                'id_kurir' => 17,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak R',
                'area_id' => 18,
                'alamat_lapak' => 'Alamat Lapak R',
                'no_telp' => '08123456772', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(18)->toDateTimeString(),
                'id_kurir' => 18,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak S',
                'area_id' => 19,
                'alamat_lapak' => 'Alamat Lapak S',
                'no_telp' => '08123456771', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(19)->toDateTimeString(),
                'id_kurir' => 19,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak T',
                'area_id' => 20,
                'alamat_lapak' => 'Alamat Lapak T',
                'no_telp' => '08123456770', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(20)->toDateTimeString(),
                'id_kurir' => 20,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak U',
                'area_id' => 21,
                'alamat_lapak' => 'Alamat Lapak U',
                'no_telp' => '08123456769', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(21)->toDateTimeString(),
                'id_kurir' => 21,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak V',
                'area_id' => 22,
                'alamat_lapak' => 'Alamat Lapak V',
                'no_telp' => '08123456768', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(22)->toDateTimeString(),
                'id_kurir' => 22,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak W',
                'area_id' => 23,
                'alamat_lapak' => 'Alamat Lapak W',
                'no_telp' => '08123456767', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(23)->toDateTimeString(),
                'id_kurir' => 23,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak X',
                'area_id' => 24,
                'alamat_lapak' => 'Alamat Lapak X',
                'no_telp' => '08123456766', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(24)->toDateTimeString(),
                'id_kurir' => 24,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak Y',
                'area_id' => 25,
                'alamat_lapak' => 'Alamat Lapak Y',
                'no_telp' => '08123456765', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(25)->toDateTimeString(),
                'id_kurir' => 25,
                'status' => 'enable',
            ],
            [
                'nama_lapak' => 'Lapak Z',
                'area_id' => 26,
                'alamat_lapak' => 'Alamat Lapak Z',
                'no_telp' => '08123456764', // Nomor telepon manual
                'created_at' => Carbon::now()->subDays(26)->toDateTimeString(),
                'id_kurir' => 26,
                'status' => 'enable',
            ]
        ]);
    }
}
