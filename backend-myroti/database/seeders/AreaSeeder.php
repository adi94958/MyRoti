<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('areadistribusi')->insert([
        [
            'area_distribusi' => 'Sarijadi',
        ],
        [
            'area_distribusi' => 'Ciwaruga',
        ],
        [
            'area_distribusi' => 'Jatinangor',
        ],
        [
            'area_distribusi' => 'Dago',
        ],
        [
            'area_distribusi' => 'Antapani',
        ],
        [
            'area_distribusi' => 'Cibaduyut',
        ],
        [
            'area_distribusi' => 'Rancaekek',
        ],
        [
            'area_distribusi' => 'Ujung Berung',
        ],
        [
            'area_distribusi' => 'Cibiru',
        ],
        [
            'area_distribusi' => 'Siliwangi',
        ]
        ]);
    }
}
