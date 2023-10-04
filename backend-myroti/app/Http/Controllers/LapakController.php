<?php

namespace App\Http\Controllers;

use App\Models\Lapak;
use Illuminate\Http\Request;

class LapakController extends Controller
{
    public function readDataLapak()
    {
        $datas = Lapak::select('kode_lapak', 'nama_lapak', 'area', 'alamat_lapak')->get();
      
        return response()->json($datas, 200);
    }

    public function registerLapak(Request $request)
    {
        // Validasi input
        $request->validate([
            'nama_lapak' => 'required',
            'area' => 'required',
            'alamat_lapak' => 'required'
        ]);

        // Buat koordinator baru
        Lapak::create([

            'nama_lapak' => $request->nama_lapak,
            'area' => $request->area,
            'alamat_lapak' => $request->alamat_lapak
        ]);

        return response()->json(['message' => 'Lapak berhasil didaftarkan']);
    }

    public function updateLapak(Request $request, $kode_lapak)
    {
        $lapak = Lapak::find($kode_lapak);

        if (!$lapak) {
            return response()->json(['message' => 'Lapak tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_lapak' => 'required',
            'area' =>'required',
            'alamat_lapak' => 'required'
        ]);


        $lapak->update([
            'nama_lapak' => $request->nama_lapak,
            'area' => $request->area,
            'alamat_lapak' => $request->alamat_lapak
        ]);

        return response()->json(['message' => 'Lapak berhasil diperbarui']);
    }

    public function deleteLapak($kode_lapak)
    {
        $lapak = Lapak::find($kode_lapak);

        if (!$lapak) {
            return response()->json(['message' => 'Lapak tidak ditemukan'], 404);
        }

        $lapak->delete();

        return response()->json(['message' => 'Lapak berhasil dihapus']);
    }
}
