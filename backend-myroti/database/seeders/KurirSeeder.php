<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KurirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kurirs')->insert([
            [
                'username' => 'kurir',
                'password' => Crypt::encryptString('kurir'),
                'nama' => 'Adrian',
                'area_id' => '1',
                'no_telp' => '081234561234',
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
                'no_telp' => '081234098734',
                'created_at' => now()->subDays(14),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir3',
                'password' => Crypt::encryptString('kurir3'),
                'nama' => 'Budi',
                'area_id' => '2',
                'user_type' => 'kurir',
                'no_telp' => '081234098735',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir4',
                'password' => Crypt::encryptString('kurir4'),
                'nama' => 'Citra',
                'area_id' => '2',
                'user_type' => 'kurir',
                'no_telp' => '081234098736',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir5',
                'password' => Crypt::encryptString('kurir5'),
                'nama' => 'David',
                'area_id' => '3',
                'user_type' => 'kurir',
                'no_telp' => '081234098737',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir6',
                'password' => Crypt::encryptString('kurir6'),
                'nama' => 'Eva',
                'area_id' => '3',
                'user_type' => 'kurir',
                'no_telp' => '081234098738',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir7',
                'password' => Crypt::encryptString('kurir7'),
                'nama' => 'Farhan',
                'area_id' => '4',
                'user_type' => 'kurir',
                'no_telp' => '081234098739',
                'created_at' => now()->subDays(10),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir8',
                'password' => Crypt::encryptString('kurir8'),
                'nama' => 'Gita',
                'area_id' => '4',
                'user_type' => 'kurir',
                'no_telp' => '081234098740',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir9',
                'password' => Crypt::encryptString('kurir9'),
                'nama' => 'Hadi',
                'area_id' => '5',
                'user_type' => 'kurir',
                'no_telp' => '081234098741',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir10',
                'password' => Crypt::encryptString('kurir10'),
                'nama' => 'Ika',
                'area_id' => '5',
                'user_type' => 'kurir',
                'no_telp' => '081234098742',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir11',
                'password' => Crypt::encryptString('kurir11'),
                'nama' => 'Joko',
                'area_id' => '6',
                'user_type' => 'kurir',
                'no_telp' => '081234098743',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir12',
                'password' => Crypt::encryptString('kurir12'),
                'nama' => 'Kemal',
                'area_id' => '7',
                'user_type' => 'kurir',
                'no_telp' => '081234098744',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir13',
                'password' => Crypt::encryptString('kurir13'),
                'nama' => 'Lia',
                'area_id' => '8',
                'user_type' => 'kurir',
                'no_telp' => '081234098745',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir14',
                'password' => Crypt::encryptString('kurir14'),
                'nama' => 'Mira',
                'area_id' => '9',
                'user_type' => 'kurir',
                'no_telp' => '081234098746',
                'created_at' => now()->subDays(9),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir15',
                'password' => Crypt::encryptString('kurir15'),
                'nama' => 'Nina',
                'area_id' => '10',
                'user_type' => 'kurir',
                'no_telp' => '081234098747',
                'created_at' => now()->subDays(3),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir16',
                'password' => Crypt::encryptString('kurir16'),
                'nama' => 'Afdal',
                'area_id' => '10',
                'user_type' => 'kurir',
                'no_telp' => '081234098748',
                'created_at' => now()->subDays(16),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir17',
                'password' => Crypt::encryptString('kurir17'),
                'nama' => 'Husein',
                'area_id' => '11',
                'user_type' => 'kurir',
                'no_telp' => '081234098749',
                'created_at' => now()->subDays(17),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir18',
                'password' => Crypt::encryptString('kurir18'),
                'nama' => 'Haikal',
                'area_id' => '11',
                'user_type' => 'kurir',
                'no_telp' => '081234098750',
                'created_at' => now()->subDays(18),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir19',
                'password' => Crypt::encryptString('kurir19'),
                'nama' => 'Amora',
                'area_id' => '12',
                'user_type' => 'kurir',
                'no_telp' => '081234098751',
                'created_at' => now()->subDays(19),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir20',
                'password' => Crypt::encryptString('kurir20'),
                'nama' => 'Blues',
                'area_id' => '12',
                'user_type' => 'kurir',
                'no_telp' => '081234098752',
                'created_at' => now()->subDays(20),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir21',
                'password' => Crypt::encryptString('kurir21'),
                'nama' => 'Beki',
                'area_id' => '13',
                'user_type' => 'kurir',
                'no_telp' => '081234098753',
                'created_at' => now()->subDays(21),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir22',
                'password' => Crypt::encryptString('kurir22'),
                'nama' => 'Chakky',
                'area_id' => '13',
                'user_type' => 'kurir',
                'no_telp' => '081234098754',
                'created_at' => now()->subDays(22),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir23',
                'password' => Crypt::encryptString('kurir23'),
                'nama' => 'Lentisa',
                'area_id' => '14',
                'user_type' => 'kurir',
                'no_telp' => '081234098755',
                'created_at' => now()->subDays(23),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir24',
                'password' => Crypt::encryptString('kurir24'),
                'nama' => 'Samuel',
                'area_id' => '14',
                'user_type' => 'kurir',
                'no_telp' => '081234098756',
                'created_at' => now()->subDays(24),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir25',
                'password' => Crypt::encryptString('kurir25'),
                'nama' => 'Rara',
                'area_id' => '15',
                'user_type' => 'kurir',
                'no_telp' => '081234098757',
                'created_at' => now()->subDays(25),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir26',
                'password' => Crypt::encryptString('kurir26'),
                'nama' => 'Qaulia',
                'area_id' => '16',
                'user_type' => 'kurir',
                'no_telp' => '081234098758',
                'created_at' => now()->subDays(26),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir27',
                'password' => Crypt::encryptString('kurir27'),
                'nama' => 'Fathia',
                'area_id' => '17',
                'user_type' => 'kurir',
                'no_telp' => '081234098759',
                'created_at' => now()->subDays(27),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir28',
                'password' => Crypt::encryptString('kurir28'),
                'nama' => 'Kemal',
                'area_id' => '17',
                'user_type' => 'kurir',
                'no_telp' => '081234098760',
                'created_at' => now()->subDays(28),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir29',
                'password' => Crypt::encryptString('kurir29'),
                'nama' => 'Raisa',
                'area_id' => '18',
                'user_type' => 'kurir',
                'no_telp' => '081234098761',
                'created_at' => now()->subDays(29),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir30',
                'password' => Crypt::encryptString('kurir30'),
                'nama' => 'Kaila',
                'area_id' => '18',
                'user_type' => 'kurir',
                'no_telp' => '081234098762',
                'created_at' => now()->subDays(30),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir31',
                'password' => Crypt::encryptString('kurir31'),
                'nama' => 'Teira',
                'area_id' => '19',
                'user_type' => 'kurir',
                'no_telp' => '081234098763',
                'created_at' => now()->subDays(31),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir32',
                'password' => Crypt::encryptString('kurir32'),
                'nama' => 'Keira',
                'area_id' => '19',
                'user_type' => 'kurir',
                'no_telp' => '081234098764',
                'created_at' => now()->subDays(32),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir33',
                'password' => Crypt::encryptString('kurir33'),
                'nama' => 'Keisya',
                'area_id' => '20',
                'user_type' => 'kurir',
                'no_telp' => '081234098765',
                'created_at' => now()->subDays(33),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir34',
                'password' => Crypt::encryptString('kurir34'),
                'nama' => 'Syifa',
                'area_id' => '20',
                'user_type' => 'kurir',
                'no_telp' => '081234098766',
                'created_at' => now()->subDays(34),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir35',
                'password' => Crypt::encryptString('kurir35'),
                'nama' => 'Rahma',
                'area_id' => '21',
                'user_type' => 'kurir',
                'no_telp' => '081234098767',
                'created_at' => now()->subDays(35),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir36',
                'password' => Crypt::encryptString('kurir36'),
                'nama' => 'Rizki',
                'area_id' => '22',
                'user_type' => 'kurir',
                'no_telp' => '081234098768',
                'created_at' => now()->subDays(36),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir37',
                'password' => Crypt::encryptString('kurir37'),
                'nama' => 'Reza',
                'area_id' => '22',
                'user_type' => 'kurir',
                'no_telp' => '081234098769',
                'created_at' => now()->subDays(37),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir38',
                'password' => Crypt::encryptString('kurir38'),
                'nama' => 'Wawan',
                'area_id' => '23',
                'user_type' => 'kurir',
                'no_telp' => '081234098770',
                'created_at' => now()->subDays(38),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir39',
                'password' => Crypt::encryptString('kurir39'),
                'nama' => 'Varid',
                'area_id' => '24',
                'user_type' => 'kurir',
                'no_telp' => '081234098771',
                'created_at' => now()->subDays(39),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir40',
                'password' => Crypt::encryptString('kurir40'),
                'nama' => 'Zake',
                'area_id' => '24',
                'user_type' => 'kurir',
                'no_telp' => '088834098772',
                'created_at' => now()->subDays(40),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir41',
                'password' => Crypt::encryptString('kurir41'),
                'nama' => 'Wahyu',
                'area_id' => '25',
                'user_type' => 'kurir',
                'no_telp' => '088834098773',
                'created_at' => now()->subDays(41),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir42',
                'password' => Crypt::encryptString('kurir42'),
                'nama' => 'Viko',
                'area_id' => '25',
                'user_type' => 'kurir',
                'no_telp' => '088834098774',
                'created_at' => now()->subDays(42),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir43',
                'password' => Crypt::encryptString('kurir43'),
                'nama' => 'Natori',
                'area_id' => '26',
                'user_type' => 'kurir',
                'no_telp' => '088834098775',
                'created_at' => now()->subDays(43),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir44',
                'password' => Crypt::encryptString('kurir44'),
                'nama' => 'Hafiz',
                'area_id' => '27',
                'user_type' => 'kurir',
                'no_telp' => '088834098776',
                'created_at' => now()->subDays(44),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir45',
                'password' => Crypt::encryptString('kurir45'),
                'nama' => 'Habib',
                'area_id' => '28',
                'user_type' => 'kurir',
                'no_telp' => '088834098777',
                'created_at' => now()->subDays(45),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir46',
                'password' => Crypt::encryptString('kurir46'),
                'nama' => 'Haris',
                'area_id' => '28',
                'user_type' => 'kurir',
                'no_telp' => '088834098778',
                'created_at' => now()->subDays(46),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir47',
                'password' => Crypt::encryptString('kurir7'),
                'nama' => 'Yaqin',
                'area_id' => '29',
                'user_type' => 'kurir',
                'no_telp' => '088834098779',
                'created_at' => now()->subDays(47),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir48',
                'password' => Crypt::encryptString('kurir48'),
                'nama' => 'Gabi',
                'area_id' => '30',
                'user_type' => 'kurir',
                'no_telp' => '088834098780',
                'created_at' => now()->subDays(48),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir49',
                'password' => Crypt::encryptString('kurir49'),
                'nama' => 'Ihsan',
                'area_id' => '30',
                'user_type' => 'kurir',
                'no_telp' => '088834098781',
                'created_at' => now()->subDays(49),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir50',
                'password' => Crypt::encryptString('kurir50'),
                'nama' => 'Mohammad',
                'area_id' => '31',
                'user_type' => 'kurir',
                'no_telp' => '088834098782',
                'created_at' => now()->subDays(50),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir51',
                'password' => Crypt::encryptString('kurir51'),
                'nama' => 'Rafif',
                'area_id' => '31',
                'user_type' => 'kurir',
                'no_telp' => '088834098783',
                'created_at' => now()->subDays(51),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir52',
                'password' => Crypt::encryptString('kurir52'),
                'nama' => 'Ahmad',
                'area_id' => '32',
                'user_type' => 'kurir',
                'no_telp' => '088834098784',
                'created_at' => now()->subDays(52),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir53',
                'password' => Crypt::encryptString('kurir53'),
                'nama' => 'Fauzy',
                'area_id' => '32',
                'user_type' => 'kurir',
                'no_telp' => '088834098785',
                'created_at' => now()->subDays(53),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir54',
                'password' => Crypt::encryptString('kurir54'),
                'nama' => 'Taqwim',
                'area_id' => '33',
                'user_type' => 'kurir',
                'no_telp' => '088834098786',
                'created_at' => now()->subDays(54),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir55',
                'password' => Crypt::encryptString('kurir55'),
                'nama' => 'Eri',
                'area_id' => '34',
                'user_type' => 'kurir',
                'no_telp' => '088834098787',
                'created_at' => now()->subDays(55),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir56',
                'password' => Crypt::encryptString('kurir56'),
                'nama' => 'Eko',
                'area_id' => '35',
                'user_type' => 'kurir',
                'no_telp' => '088834098788',
                'created_at' => now()->subDays(56),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir57',
                'password' => Crypt::encryptString('kurir57'),
                'nama' => 'Eki',
                'area_id' => '36',
                'user_type' => 'kurir',
                'no_telp' => '088834098789',
                'created_at' => now()->subDays(57),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir58',
                'password' => Crypt::encryptString('kurir58'),
                'nama' => 'Natsume',
                'area_id' => '37',
                'user_type' => 'kurir',
                'no_telp' => '088834098790',
                'created_at' => now()->subDays(58),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir59',
                'password' => Crypt::encryptString('kurir59'),
                'nama' => 'Zaki',
                'area_id' => '38',
                'user_type' => 'kurir',
                'no_telp' => '088834234791',
                'created_at' => now()->subDays(59),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir60',
                'password' => Crypt::encryptString('kurir60'),
                'nama' => 'Zaziel',
                'area_id' => '39',
                'user_type' => 'kurir',
                'no_telp' => '088834234792',
                'created_at' => now()->subDays(60),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir61',
                'password' => Crypt::encryptString('kurir61'),
                'nama' => 'Beri',
                'area_id' => '41',
                'user_type' => 'kurir',
                'no_telp' => '088834234793',
                'created_at' => now()->subDays(61),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir62',
                'password' => Crypt::encryptString('kurir62'),
                'nama' => 'Hilman',
                'area_id' => '41',
                'user_type' => 'kurir',
                'no_telp' => '088834234794',
                'created_at' => now()->subDays(62),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir63',
                'password' => Crypt::encryptString('kurir63'),
                'nama' => 'Haki',
                'area_id' => '41',
                'user_type' => 'kurir',
                'no_telp' => '088834234795',
                'created_at' => now()->subDays(63),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir64',
                'password' => Crypt::encryptString('kurir64'),
                'nama' => 'Fadhil',
                'area_id' => '42',
                'user_type' => 'kurir',
                'no_telp' => '088834234796',
                'created_at' => now()->subDays(64),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir65',
                'password' => Crypt::encryptString('kurir65'),
                'nama' => 'Ilham',
                'area_id' => '43',
                'user_type' => 'kurir',
                'no_telp' => '088834234797',
                'created_at' => now()->subDays(65),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir66',
                'password' => Crypt::encryptString('kurir66'),
                'nama' => 'Fashar',
                'area_id' => '44',
                'user_type' => 'kurir',
                'no_telp' => '088834234798',
                'created_at' => now()->subDays(66),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir67',
                'password' => Crypt::encryptString('kurir67'),
                'nama' => 'Adinda',
                'area_id' => '45',
                'user_type' => 'kurir',
                'no_telp' => '088834234799',
                'created_at' => now()->subDays(67),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir68',
                'password' => Crypt::encryptString('kurir68'),
                'nama' => 'Fahira',
                'area_id' => '46',
                'user_type' => 'kurir',
                'no_telp' => '088834239810',
                'created_at' => now()->subDays(68),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir69',
                'password' => Crypt::encryptString('kurir69'),
                'nama' => 'Fira',
                'area_id' => '47',
                'user_type' => 'kurir',
                'no_telp' => '088834239811',
                'created_at' => now()->subDays(69),
                'updated_at' => now(),
            ],
            [
                'username' => 'kurir70',
                'password' => Crypt::encryptString('kurir70'),
                'nama' => 'Firdaus',
                'area_id' => '48',
                'user_type' => 'kurir',
                'no_telp' => '088834239812',
                'created_at' => now()->subDays(70),
                'updated_at' => now(),
            ]
        ]);
    }
}