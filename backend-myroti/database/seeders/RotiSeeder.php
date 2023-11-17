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
                'nama_roti' => 'croissant',
                'stok_roti' =>  20, 
                'rasa_roti'=> 'strawberry',
                'harga_satuan_roti' => 5000,
            ],
            [
                'nama_roti' => 'macaron',
                'stok_roti' =>  30, 
                'rasa_roti'=> 'strawberry',
                'harga_satuan_roti' => 5000,
            ],
            [
                'nama_roti' => 'Choco Twist',
                'stok_roti' => 25,
                'rasa_roti' => 'cokelat',
                'harga_satuan_roti' => 6000
            ],
            [
                'nama_roti' => 'Blueberry Bliss',
                'stok_roti' => 40,
                'rasa_roti' => 'blueberry',
                'harga_satuan_roti' => 7000
            ],
            [
                'nama_roti' => 'Caramel Crunch',
                'stok_roti' => 15,
                'rasa_roti' => 'karamel',
                'harga_satuan_roti' => 8000
            ],
            [
                'nama_roti' => 'Almond Delight',
                'stok_roti' => 20,
                'rasa_roti' => 'almond',
                'harga_satuan_roti' => 7500
            ],
            [
                'nama_roti' => 'Raspberry Roll',
                'stok_roti' => 35,
                'rasa_roti' => 'raspberry',
                'harga_satuan_roti' => 8500
            ],
            [
                'nama_roti' => 'Hazelnut Heaven',
                'stok_roti' => 18,
                'rasa_roti' => 'hazelnut',
                'harga_satuan_roti' => 9000
            ],
            [
                'nama_roti' => 'Pistachio Paradise',
                'stok_roti' => 22,
                'rasa_roti' => 'pistachio',
                'harga_satuan_roti' => 9500
            ],
            [
                'nama_roti' => 'Lemon Lush',
                'stok_roti' => 28,
                'rasa_roti' => 'lemon',
                'harga_satuan_roti' => 8000
            ],
            [
                'nama_roti' => 'Mango Tango',
                'stok_roti' => 30,
                'rasa_roti' => 'mango',
                'harga_satuan_roti' => 7500
            ],
            [
                'nama_roti' => 'Vanilla Velvet',
                'stok_roti' => 25,
                'rasa_roti' => 'vanila',
                'harga_satuan_roti' => 7000
            ],
            [
                'nama_roti' => 'Peachy Pleasure',
                'stok_roti' => 20,
                'rasa_roti' => 'peach',
                'harga_satuan_roti' => 8500
            ],
            [
                'nama_roti' => 'Coconut Crunch',
                'stok_roti' => 15,
                'rasa_roti' => 'kelapa',
                'harga_satuan_roti' => 9000
            ],
            [
                'nama_roti' => 'Strawberry Swirl',
                'stok_roti' => 35,
                'rasa_roti' => 'strawberry',
                'harga_satuan_roti' => 7500
            ],
            [
                'nama_roti' => 'Green Tea Delight',
                'stok_roti' => 25,
                'rasa_roti' => 'green tea',
                'harga_satuan_roti' => 8500
            ],
            [
                'nama_roti' => 'Orange Zest',
                'stok_roti' => 30,
                'rasa_roti' => 'jeruk',
                'harga_satuan_roti' => 8000
            ],
            [
                'nama_roti' => 'Red Velvet Rapture',
                'stok_roti' => 28,
                'rasa_roti' => 'red velvet',
                'harga_satuan_roti' => 9000
            ],
            [
                'nama_roti' => 'Peanut Butter Paradise',
                'stok_roti' => 20,
                'rasa_roti' => 'kacang',
                'harga_satuan_roti' => 9500
            ],
            [
                'nama_roti' => 'Blackberry Bliss',
                'stok_roti' => 30,
                'rasa_roti' => 'blackberry',
                'harga_satuan_roti' => 7000
            ],
            [
                'nama_roti' => 'Mint Chocolate Marvel',
                'stok_roti' => 22,
                'rasa_roti' => 'mint cokelat',
                'harga_satuan_roti' => 8500
            ],
            [
                'nama_roti' => 'Oreo Overload',
                'stok_roti' => 25,
                'rasa_roti' => 'oreo',
                'harga_satuan_roti' => 9000
            ]
            ]);
    }
}
