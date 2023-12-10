<?php

namespace App\Http\Controllers;

use App\Models\Roti;
use App\Models\Transaksi;
use App\Models\TransaksiRoti;
use Illuminate\Http\Request;

class DataRotiController extends Controller
{
    public function readDataRoti()
    {
        $datas = Roti::select('kode_roti', 'nama_roti', 'stok_roti', 'rasa_roti', 'harga_satuan_roti')->get();
      
        return response()->json($datas, 200);
    }

    public function registerRoti(Request $request)
    {
        // Validasi input
        $request->validate([
            'nama_roti' => 'required',
            'stok_roti' => 'required',
            'rasa_roti' => 'required',
            'harga_satuan_roti' => 'required'
        ]);

        // Buat koordinator baru
        Roti::create([

            'nama_roti' => $request->nama_roti,
            'stok_roti' => $request->stok_roti,
            'rasa_roti' => $request->rasa_roti,
            'harga_satuan_roti' => $request->harga_satuan_roti
        ]);

        return response()->json(['message' => 'DataRoti berhasil didaftarkan']);
    }

    public function updateRoti(Request $request, $kode_roti)
    {
        $roti = Roti::find($kode_roti);

        if (!$roti) {
            return response()->json(['message' => 'Data roti tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_roti' => 'required',
            'stok_roti' => 'required',
            'rasa_roti' => 'required',
            'harga_satuan_roti' => 'required'
        ]);


        $roti->update([
            'nama_roti' => $request->nama_roti,
            'stok_roti' => $request->stok_roti,
            'rasa_roti' => $request->rasa_roti,
            'harga_satuan_roti' => $request->harga_satuan_roti
        ]);

        return response()->json(['message' => 'Data roti berhasil diperbarui']);
    }

    public function deleteRoti($kode_roti)
    {
        $roti = Roti::find($kode_roti);

        if (!$roti) {
            return response()->json(['message' => 'Data roti tidak ditemukan'], 404);
        }

        $roti->delete();

        return response()->json(['message' => 'Data roti berhasil dihapus']);
    }
}
