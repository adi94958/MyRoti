<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RotiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dataroti')->insert([
            [
                'nama_roti' => 'Croissant',
                'stok_roti' =>  300,
                'rasa_roti' => 'strawberry',
                'harga_satuan_roti' => 5000,
            ],
            [
                'nama_roti' => 'Macaron',
                'stok_roti' =>  300,
                'rasa_roti' => 'Keju',
                'harga_satuan_roti' => 5000,
            ],
            [
                'nama_roti' => 'Choco Twist',
                'stok_roti' => 300,
                'rasa_roti' => 'cokelat',
                'harga_satuan_roti' => 6000
            ],
            [
                'nama_roti' => 'Blueberry Bliss',
                'stok_roti' => 300,
                'rasa_roti' => 'Blueberry',
                'harga_satuan_roti' => 7000
            ],
            [
                'nama_roti' => 'Caramel Crunch',
                'stok_roti' => 300,
                'rasa_roti' => 'Caramel',
                'harga_satuan_roti' => 8000
            ],
            [
                'nama_roti' => 'Almond Delight',
                'stok_roti' => 300,
                'rasa_roti' => 'Almond',
                'harga_satuan_roti' => 7500
            ],
            [
                'nama_roti' => 'Raspberry Roll',
                'stok_roti' => 300,
                'rasa_roti' => 'Raspberry',
                'harga_satuan_roti' => 8500
            ],
            [
                'nama_roti' => 'Hazelnut Heaven',
                'stok_roti' => 300,
                'rasa_roti' => 'Hazelnut',
                'harga_satuan_roti' => 9000
            ],
            [
                'nama_roti' => 'Pistachio Paradise',
                'stok_roti' => 300,
                'rasa_roti' => 'pistachio',
                'harga_satuan_roti' => 9500
            ],
            [
                'nama_roti' => 'Lemon Lush',
                'stok_roti' => 300,
                'rasa_roti' => 'Lemon',
                'harga_satuan_roti' => 8000
            ],
            [
                'nama_roti' => 'Mango Tango',
                'stok_roti' => 300,
                'rasa_roti' => 'Mango',
                'harga_satuan_roti' => 7500
            ],
            [
                'nama_roti' => 'Vanilla Velvet',
                'stok_roti' => 300,
                'rasa_roti' => 'Vanila',
                'harga_satuan_roti' => 7000
            ],
            [
                'nama_roti' => 'Peachy Pleasure',
                'stok_roti' => 300,
                'rasa_roti' => 'Peach',
                'harga_satuan_roti' => 8500
            ],
            [
                'nama_roti' => 'Coconut Crunch',
                'stok_roti' => 300,
                'rasa_roti' => 'Kelapa',
                'harga_satuan_roti' => 9000
            ],
            [
                'nama_roti' => 'Strawberry Swirl',
                'stok_roti' => 300,
                'rasa_roti' => 'Strawberry',
                'harga_satuan_roti' => 7500
            ],
            [
                'nama_roti' => 'Green Tea Delight',
                'stok_roti' => 300,
                'rasa_roti' => 'Green tea',
                'harga_satuan_roti' => 8500
            ],
            [
                'nama_roti' => 'Orange Zest',
                'stok_roti' => 300,
                'rasa_roti' => 'Jeruk',
                'harga_satuan_roti' => 8000
            ],
            [
                'nama_roti' => 'Red Velvet Rapture',
                'stok_roti' => 300,
                'rasa_roti' => 'Red velvet',
                'harga_satuan_roti' => 9000
            ],
            [
                'nama_roti' => 'Peanut Butter Paradise',
                'stok_roti' => 300,
                'rasa_roti' => 'Kacang',
                'harga_satuan_roti' => 9500
            ],
            [
                'nama_roti' => 'Blackberry Bliss',
                'stok_roti' => 300,
                'rasa_roti' => 'Blackberry',
                'harga_satuan_roti' => 7000
            ],
            [
                'nama_roti' => 'Mint Chocolate Marvel',
                'stok_roti' => 300,
                'rasa_roti' => 'Mint cokelat',
                'harga_satuan_roti' => 8500
            ],
            [
                'nama_roti' => 'Oreo Overload',
                'stok_roti' => 300,
                'rasa_roti' => 'Oreo',
                'harga_satuan_roti' => 9000
            ]
        ]);
    }
}
