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
                'no_telp' => '09876543',
                'created_at' => now()->subDays(14),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir2',
                'password' => Crypt::encryptString('kurir2'),
                'nama' => 'Fadel',
                'area_id' => '1',
                'user_type' => 'kurir',
                'no_telp' => '09876542',  // Nomor telepon untuk kurir2
                'created_at' => now()->subDays(14),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir3',
                'password' => Crypt::encryptString('kurir3'),
                'nama' => 'Budi',
                'area_id' => '2',
                'user_type' => 'kurir',
                'no_telp' => '09876543',  // Nomor telepon untuk kurir3
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir4',
                'password' => Crypt::encryptString('kurir4'),
                'nama' => 'Citra',
                'area_id' => '2',
                'user_type' => 'kurir',
                'no_telp' => '09876544',  // Nomor telepon untuk kurir4
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir5',
                'password' => Crypt::encryptString('kurir5'),
                'nama' => 'David',
                'area_id' => '3',
                'user_type' => 'kurir',
                'no_telp' => '09876545',  // Nomor telepon untuk kurir5
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir6',
                'password' => Crypt::encryptString('kurir6'),
                'nama' => 'Eva',
                'area_id' => '3',
                'user_type' => 'kurir',
                'no_telp' => '09876546',  // Nomor telepon untuk kurir6
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir7',
                'password' => Crypt::encryptString('kurir7'),
                'nama' => 'Farhan',
                'area_id' => '4',
                'user_type' => 'kurir',
                'no_telp' => '09876547',  // Nomor telepon untuk kurir7
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir8',
                'password' => Crypt::encryptString('kurir8'),
                'nama' => 'Gita',
                'area_id' => '4',
                'user_type' => 'kurir',
                'no_telp' => '09876548',  // Nomor telepon untuk kurir8
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir9',
                'password' => Crypt::encryptString('kurir9'),
                'nama' => 'Hadi',
                'area_id' => '5',
                'user_type' => 'kurir',
                'no_telp' => '09876549',  // Nomor telepon untuk kurir9
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir10',
                'password' => Crypt::encryptString('kurir10'),
                'nama' => 'Ika',
                'area_id' => '5',
                'user_type' => 'kurir',
                'no_telp' => '09876550',  // Nomor telepon untuk kurir10
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir11',
                'password' => Crypt::encryptString('kurir11'),
                'nama' => 'Joko',
                'area_id' => '6',
                'user_type' => 'kurir',
                'no_telp' => '09876551',  // Nomor telepon untuk kurir11
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir12',
                'password' => Crypt::encryptString('kurir12'),
                'nama' => 'Kemal',
                'area_id' => '7',
                'user_type' => 'kurir',
                'no_telp' => '09876552',  // Nomor telepon untuk kurir12
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir13',
                'password' => Crypt::encryptString('kurir13'),
                'nama' => 'Lia',
                'area_id' => '8',
                'user_type' => 'kurir',
                'no_telp' => '09876553',  // Nomor telepon untuk kurir13
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir14',
                'password' => Crypt::encryptString('kurir14'),
                'nama' => 'Mira',
                'area_id' => '9',
                'user_type' => 'kurir',
                'no_telp' => '09876554',  // Nomor telepon untuk kurir14
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir15',
                'password' => Crypt::encryptString('kurir15'),
                'nama' => 'Nina',
                'area_id' => '10',
                'user_type' => 'kurir',
                'no_telp' => '09876555',  // Nomor telepon untuk kurir15
                'created_at' => now()->subDays(3),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir16',
                'password' => Crypt::encryptString('kurir16'),
                'nama' => 'Afdal',
                'area_id' => '10',
                'user_type' => 'kurir',
                'no_telp' => '09876556',  // Nomor telepon untuk kurir16
                'created_at' => now()->subDays(16),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir17',
                'password' => Crypt::encryptString('kurir17'),
                'nama' => 'Husein',
                'area_id' => '11',
                'user_type' => 'kurir',
                'no_telp' => '09876557',  // Nomor telepon untuk kurir17
                'created_at' => now()->subDays(17),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir18',
                'password' => Crypt::encryptString('kurir18'),
                'nama' => 'Haikal',
                'area_id' => '11',
                'user_type' => 'kurir',
                'no_telp' => '09876558',  // Nomor telepon untuk kurir18
                'created_at' => now()->subDays(18),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir19',
                'password' => Crypt::encryptString('kurir19'),
                'nama' => 'KurirN',
                'area_id' => '12',
                'user_type' => 'kurir',
                'no_telp' => '09876559',  // Nomor telepon untuk kurir19
                'created_at' => now()->subDays(19),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir20',
                'password' => Crypt::encryptString('kurir20'),
                'nama' => 'KurirN',
                'area_id' => '12',
                'user_type' => 'kurir',
                'no_telp' => '09876560',  // Nomor telepon untuk kurir20
                'created_at' => now()->subDays(20),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir21',
                'password' => Crypt::encryptString('kurir21'),
                'nama' => 'KurirN',
                'area_id' => '13',
                'user_type' => 'kurir',
                'no_telp' => '09876561',  // Nomor telepon untuk kurir21
                'created_at' => now()->subDays(21),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir22',
                'password' => Crypt::encryptString('kurir22'),
                'nama' => 'KurirN',
                'area_id' => '13',
                'user_type' => 'kurir',
                'no_telp' => '09876562',  // Nomor telepon untuk kurir22
                'created_at' => now()->subDays(22),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir23',
                'password' => Crypt::encryptString('kurir23'),
                'nama' => 'KurirN',
                'area_id' => '14',
                'user_type' => 'kurir',
                'no_telp' => '09876563',  // Nomor telepon untuk kurir23
                'created_at' => now()->subDays(23),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir24',
                'password' => Crypt::encryptString('kurir24'),
                'nama' => 'KurirN',
                'area_id' => '14',
                'user_type' => 'kurir',
                'no_telp' => '09876564',  // Nomor telepon untuk kurir24
                'created_at' => now()->subDays(24),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir25',
                'password' => Crypt::encryptString('kurir25'),
                'nama' => 'KurirN',
                'area_id' => '15',
                'user_type' => 'kurir',
                'no_telp' => '09876565',  // Nomor telepon untuk kurir25
                'created_at' => now()->subDays(25),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir26',
                'password' => Crypt::encryptString('kurir26'),
                'nama' => 'KurirN',
                'area_id' => '16',
                'user_type' => 'kurir',
                'no_telp' => '09876566',  // Nomor telepon untuk kurir26
                'created_at' => now()->subDays(26),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir27',
                'password' => Crypt::encryptString('kurir27'),
                'nama' => 'KurirN',
                'area_id' => '17',
                'user_type' => 'kurir',
                'no_telp' => '09876567',  // Nomor telepon untuk kurir27
                'created_at' => now()->subDays(27),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir28',
                'password' => Crypt::encryptString('kurir28'),
                'nama' => 'KurirN',
                'area_id' => '17',
                'user_type' => 'kurir',
                'no_telp' => '09876568',  // Nomor telepon untuk kurir28
                'created_at' => now()->subDays(28),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir29',
                'password' => Crypt::encryptString('kurir29'),
                'nama' => 'KurirN',
                'area_id' => '18',
                'user_type' => 'kurir',
                'no_telp' => '09876569',  // Nomor telepon untuk kurir29
                'created_at' => now()->subDays(29),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir30',
                'password' => Crypt::encryptString('kurir30'),
                'nama' => 'KurirN',
                'area_id' => '18',
                'user_type' => 'kurir',
                'no_telp' => '09876570',  // Nomor telepon untuk kurir30
                'created_at' => now()->subDays(30),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir31',
                'password' => Crypt::encryptString('kurir31'),
                'nama' => 'KurirN',
                'area_id' => '19',
                'user_type' => 'kurir',
                'no_telp' => '09876571',  // Nomor telepon untuk kurir31
                'created_at' => now()->subDays(31),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir32',
                'password' => Crypt::encryptString('kurir32'),
                'nama' => 'KurirN',
                'area_id' => '19',
                'user_type' => 'kurir',
                'no_telp' => '09876572',  // Nomor telepon untuk kurir32
                'created_at' => now()->subDays(32),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir33',
                'password' => Crypt::encryptString('kurir33'),
                'nama' => 'KurirN',
                'area_id' => '20',
                'user_type' => 'kurir',
                'no_telp' => '09876573',  // Nomor telepon untuk kurir33
                'created_at' => now()->subDays(33),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir34',
                'password' => Crypt::encryptString('kurir34'),
                'nama' => 'KurirN',
                'area_id' => '20',
                'user_type' => 'kurir',
                'no_telp' => '09876574',  // Nomor telepon untuk kurir34
                'created_at' => now()->subDays(34),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir35',
                'password' => Crypt::encryptString('kurir35'),
                'nama' => 'KurirN',
                'area_id' => '21',
                'user_type' => 'kurir',
                'no_telp' => '09876575',  // Nomor telepon untuk kurir35
                'created_at' => now()->subDays(35),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir36',
                'password' => Crypt::encryptString('kurir36'),
                'nama' => 'KurirN',
                'area_id' => '22',
                'user_type' => 'kurir',
                'no_telp' => '09876576',  // Nomor telepon untuk kurir36
                'created_at' => now()->subDays(36),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir37',
                'password' => Crypt::encryptString('kurir37'),
                'nama' => 'KurirN',
                'area_id' => '22',
                'user_type' => 'kurir',
                'no_telp' => '09876577',  // Nomor telepon untuk kurir37
                'created_at' => now()->subDays(37),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir38',
                'password' => Crypt::encryptString('kurir38'),
                'nama' => 'KurirN',
                'area_id' => '23',
                'user_type' => 'kurir',
                'no_telp' => '09876578',  // Nomor telepon untuk kurir38
                'created_at' => now()->subDays(38),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir39',
                'password' => Crypt::encryptString('kurir39'),
                'nama' => 'KurirN',
                'area_id' => '24',
                'user_type' => 'kurir',
                'no_telp' => '09876579',  // Nomor telepon untuk kurir39
                'created_at' => now()->subDays(39),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir40',
                'password' => Crypt::encryptString('kurir40'),
                'nama' => 'KurirN',
                'area_id' => '24',
                'user_type' => 'kurir',
                'no_telp' => '09876580',  // Nomor telepon untuk kurir40
                'created_at' => now()->subDays(40),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir41',
                'password' => Crypt::encryptString('kurir41'),
                'nama' => 'KurirN',
                'area_id' => '25',
                'user_type' => 'kurir',
                'no_telp' => '09876581',  // Nomor telepon untuk kurir41
                'created_at' => now()->subDays(41),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir42',
                'password' => Crypt::encryptString('kurir42'),
                'nama' => 'KurirN',
                'area_id' => '25',
                'user_type' => 'kurir',
                'no_telp' => '09876582',  // Nomor telepon untuk kurir42
                'created_at' => now()->subDays(42),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir43',
                'password' => Crypt::encryptString('kurir43'),
                'nama' => 'KurirN',
                'area_id' => '26',
                'user_type' => 'kurir',
                'no_telp' => '09876583',  // Nomor telepon untuk kurir43
                'created_at' => now()->subDays(43),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir44',
                'password' => Crypt::encryptString('kurir44'),
                'nama' => 'KurirN',
                'area_id' => '27',
                'user_type' => 'kurir',
                'no_telp' => '09876584',  // Nomor telepon untuk kurir44
                'created_at' => now()->subDays(44),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir45',
                'password' => Crypt::encryptString('kurir45'),
                'nama' => 'KurirN',
                'area_id' => '28',
                'user_type' => 'kurir',
                'no_telp' => '09876585',  // Nomor telepon untuk kurir45
                'created_at' => now()->subDays(45),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir46',
                'password' => Crypt::encryptString('kurir46'),
                'nama' => 'KurirN',
                'area_id' => '28',
                'user_type' => 'kurir',
                'no_telp' => '09876586',  // Nomor telepon untuk kurir46
                'created_at' => now()->subDays(46),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir47',
                'password' => Crypt::encryptString('kurir47'),
                'nama' => 'KurirN',
                'area_id' => '29',
                'user_type' => 'kurir',
                'no_telp' => '09876587',  // Nomor telepon untuk kurir47
                'created_at' => now()->subDays(47),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir48',
                'password' => Crypt::encryptString('kurir48'),
                'nama' => 'KurirN',
                'area_id' => '30',
                'user_type' => 'kurir',
                'no_telp' => '09876588',  // Nomor telepon untuk kurir48
                'created_at' => now()->subDays(48),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir49',
                'password' => Crypt::encryptString('kurir49'),
                'nama' => 'KurirN',
                'area_id' => '30',
                'user_type' => 'kurir',
                'no_telp' => '09876589',  // Nomor telepon untuk kurir49
                'created_at' => now()->subDays(49),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir50',
                'password' => Crypt::encryptString('kurir50'),
                'nama' => 'KurirN',
                'area_id' => '31',
                'user_type' => 'kurir',
                'no_telp' => '09876590',  // Nomor telepon untuk kurir50
                'created_at' => now()->subDays(50),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir51',
                'password' => Crypt::encryptString('kurir51'),
                'nama' => 'Nama1',  // Ubah nama sesuai keinginan Anda
                'area_id' => '31',
                'user_type' => 'kurir',
                'no_telp' => '09876591',
                'created_at' => now()->subDays(51),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir52',
                'password' => Crypt::encryptString('kurir52'),
                'nama' => 'Nama2',  // Ubah nama sesuai keinginan Anda
                'area_id' => '32',
                'user_type' => 'kurir',
                'no_telp' => '09876592',
                'created_at' => now()->subDays(52),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir53',
                'password' => Crypt::encryptString('kurir53'),
                'nama' => 'Nama3',  // Ubah nama sesuai keinginan Anda
                'area_id' => '32',
                'user_type' => 'kurir',
                'no_telp' => '09876593',
                'created_at' => now()->subDays(53),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir54',
                'password' => Crypt::encryptString('kurir54'),
                'nama' => 'Nama4',  // Ubah nama sesuai keinginan Anda
                'area_id' => '32',
                'user_type' => 'kurir',
                'no_telp' => '09876594',
                'created_at' => now()->subDays(54),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir55',
                'password' => Crypt::encryptString('kurir55'),
                'nama' => 'Nama5',  // Ubah nama sesuai keinginan Anda
                'area_id' => '34',
                'user_type' => 'kurir',
                'no_telp' => '09876595',
                'created_at' => now()->subDays(55),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir56',
                'password' => Crypt::encryptString('kurir56'),
                'nama' => 'Nama6',  // Ubah nama sesuai keinginan Anda
                'area_id' => '35',
                'user_type' => 'kurir',
                'no_telp' => '09876596',
                'created_at' => now()->subDays(56),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir57',
                'password' => Crypt::encryptString('kurir57'),
                'nama' => 'Nama7',  // Ubah nama sesuai keinginan Anda
                'area_id' => '36',
                'user_type' => 'kurir',
                'no_telp' => '09876597',
                'created_at' => now()->subDays(57),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir58',
                'password' => Crypt::encryptString('kurir58'),
                'nama' => 'Nama8',  // Ubah nama sesuai keinginan Anda
                'area_id' => '37',
                'user_type' => 'kurir',
                'no_telp' => '09876598',
                'created_at' => now()->subDays(58),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir59',
                'password' => Crypt::encryptString('kurir59'),
                'nama' => 'Nama9',  // Ubah nama sesuai keinginan Anda
                'area_id' => '38',
                'user_type' => 'kurir',
                'no_telp' => '09876599',
                'created_at' => now()->subDays(59),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir60',
                'password' => Crypt::encryptString('kurir60'),
                'nama' => 'Nama10',  // Ubah nama sesuai keinginan Anda
                'area_id' => '39',
                'user_type' => 'kurir',
                'no_telp' => '09876600',
                'created_at' => now()->subDays(60),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir61',
                'password' => Crypt::encryptString('kurir61'),
                'nama' => 'Nama11',  // Ubah nama sesuai keinginan Anda
                'area_id' => '39',
                'user_type' => 'kurir',
                'no_telp' => '09876601',
                'created_at' => now()->subDays(61),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir62',
                'password' => Crypt::encryptString('kurir62'),
                'nama' => 'Nama12',  // Ubah nama sesuai keinginan Anda
                'area_id' => '36',
                'user_type' => 'kurir',
                'no_telp' => '09876602',
                'created_at' => now()->subDays(62),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir63',
                'password' => Crypt::encryptString('kurir63'),
                'nama' => 'Nama13',  // Ubah nama sesuai keinginan Anda
                'area_id' => '37',
                'user_type' => 'kurir',
                'no_telp' => '09876603',
                'created_at' => now()->subDays(63),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir64',
                'password' => Crypt::encryptString('kurir64'),
                'nama' => 'Nama14',  // Ubah nama sesuai keinginan Anda
                'area_id' => '38',
                'user_type' => 'kurir',
                'no_telp' => '09876604',
                'created_at' => now()->subDays(64),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir65',
                'password' => Crypt::encryptString('kurir65'),
                'nama' => 'Nama15',  // Ubah nama sesuai keinginan Anda
                'area_id' => '39',
                'user_type' => 'kurir',
                'no_telp' => '09876605',
                'created_at' => now()->subDays(65),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir66',
                'password' => Crypt::encryptString('kurir66'),
                'nama' => 'Nama16',  // Ubah nama sesuai keinginan Anda
                'area_id' => '40',
                'user_type' => 'kurir',
                'no_telp' => '09876606',
                'created_at' => now()->subDays(66),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir67',
                'password' => Crypt::encryptString('kurir67'),
                'nama' => 'Nama17',  // Ubah nama sesuai keinginan Anda
                'area_id' => '41',
                'user_type' => 'kurir',
                'no_telp' => '09876607',
                'created_at' => now()->subDays(67),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir68',
                'password' => Crypt::encryptString('kurir68'),
                'nama' => 'Nama18',  // Ubah nama sesuai keinginan Anda
                'area_id' => '42',
                'user_type' => 'kurir',
                'no_telp' => '09876608',
                'created_at' => now()->subDays(68),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir69',
                'password' => Crypt::encryptString('kurir69'),
                'nama' => 'Nama19',  // Ubah nama sesuai keinginan Anda
                'area_id' => '43',
                'user_type' => 'kurir',
                'no_telp' => '09876609',
                'created_at' => now()->subDays(69),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir70',
                'password' => Crypt::encryptString('kurir70'),
                'nama' => 'Nama20',  // Ubah nama sesuai keinginan Anda
                'area_id' => '43',
                'user_type' => 'kurir',
                'no_telp' => '09876610',
                'created_at' => now()->subDays(70),
                'updated_at' => now(),
            ],
        ]);
    }
}
