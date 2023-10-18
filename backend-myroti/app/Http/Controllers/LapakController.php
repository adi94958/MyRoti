<?php

namespace App\Http\Controllers;

use App\Models\Lapak;
use App\Models\Kurir;
use App\Models\Area_Distribusi;
use Illuminate\Http\Request;


class LapakController extends Controller
{
    public function readDataLapak()
    {
        $datas = Lapak::select('kode_lapak','nama_lapak', 'id_kurir', 'area_id', 'alamat_lapak')
            ->join('areadistribusi', 'lapak.area_id', '=', 'areadistribusi.id')
            ->join('kurirs', 'lapak.id_kurir', '=', 'kurirs.id')
            ->select('lapak.kode_lapak','lapak.nama_lapak', 'kurirs.nama', 'areadistribusi.area_distribusi', 'lapak.alamat_lapak')
            ->get();

        return response()->json($datas, 200);
    }

    public function registerLapak(Request $request)
    {
        // Validasi input
        $request->validate([
            'nama_lapak' => 'required',
            'area_id' => 'required',
            'id_kurir' => 'required',
            'alamat_lapak' => 'required'
        ]);

        $kurir = Kurir::where('id', $request->id_kurir)->first();
        $area = Area_Distribusi::where('id', $request->area_id)->first();

        if($area){

            if($kurir){
                Lapak::create([
                    'nama_lapak' => $request->nama_lapak,
                    'area_id' => $area->id,
                    'id_kurir' => $kurir->id,
                    'alamat_lapak' => $request->alamat_lapak
                ]);
                return response()->json(['message' => 'Lapak berhasil didaftarkan']);

            }
            return response()->json(['message' => 'Kurir dan Lapak tidak sesuai']);

        }

        return response()->json(['message' => 'Area tidak ditemukan']);
    }

    public function updateLapak(Request $request, $kode_lapak)
    {
        $lapak = Lapak::find($kode_lapak);

        if (!$lapak) {
            return response()->json(['message' => 'Lapak tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_lapak' => 'required',
            'id_kurir' => 'required',
            'area_id' =>'required',
            'alamat_lapak' => 'required'
        ]);


        $lapak->update([
            'nama_lapak' => $request->nama_lapak,
            'id_kurir' => $request->id_kurir,
            'area_id' => $request->area,
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
