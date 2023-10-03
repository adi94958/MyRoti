<?php

namespace App\Http\Controllers;

use App\Models\Lapak;
use Illuminate\Http\Request;

class LapakController extends Controller
{
    public function readDataLapak()
    {
        $datas = Lapak::select('kode_lapak', 'nama_roti', 'stok_roti', 'rasa_roti', 'harga_satuan_roti')->get();
      
        return response()->json($datas, 200);
    }
}
