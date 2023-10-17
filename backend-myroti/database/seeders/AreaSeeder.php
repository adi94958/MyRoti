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
        ]
        ]);
    }
}
