<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Models\Lapak;
use App\Models\Roti;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function readTransaksi()
    {
        $datas = Transaksi::select('id_transaksi', 'kode_lapak', 'kode_roti', 'jumlah_roti', 'id_kurir')->get();
      
        return response()->json($datas, 200);
    }

    public function createTransaksi(Request $request)
    {
        // Validasi input
        $request->validate([
            'kode_lapak' => 'required',
            'kode_roti' => 'required',
            'jumlah_roti' => 'required',
        ]);

        $lapak = Lapak::where('kode_lapak', $request->kode_lapak)->first();
        $roti = Roti::where('kode_roti', $request->kode_roti)->first();


        // Buat koordinator baru
        if ($lapak) {
            // Dapatkan 'id_kurir' dari 'lapak'
            $id_kurir = $lapak->id_kurir;

            if($roti) {
                 // Simpan data ke tabel 'transaksi' termasuk 'id_kurir' yang telah ditemukan
                Transaksi::create([
                    'kode_lapak' => $request->kode_lapak,
                    'kode_roti' => $roti->kode_roti,
                    'jumlah_roti' => $request->jumlah_roti,
                    'id_kurir' => $id_kurir,
                ]);

                $roti->stok_roti -= $request->jumlah_roti;
                $roti->save();

                return response()->json(['message' => 'Transaksi berhasil dibuat']);

            }

            return response()->json(['message' => 'Roti tidak ditemukan']);
        
           
        }
        return response()->json(['message' => 'Lapak tidak ditemukan']);
    }

    
}
