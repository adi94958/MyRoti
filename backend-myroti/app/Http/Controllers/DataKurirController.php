<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Http\Controllers\LapakController;
use App\Models\Kurir;
use App\Models\Koordinator;
use App\Models\Area_Distribusi;
use App\Models\Keuangan;
use App\Models\Pemilik;
use App\Models\Transaksi;
use App\Models\Lapak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class DataKurirController extends Controller
{
    public function readDataKurir()
    {
        
        $datas = Kurir::select('id','username', 'password', 'nama', 'area_id')
            ->join('areadistribusi', 'kurirs.area_id', '=', 'areadistribusi.area_id')
            ->select('kurirs.id_kurir','kurirs.username','kurirs.password', 'kurirs.nama', 'kurirs.user_type','areadistribusi.area_distribusi')
            ->get();

        foreach ($datas as $data) {
            $data->password = Crypt::decryptString($data->password);
        }

        return response()->json($datas, 200);
    }

    public function registerKurir(Request $request)
    {
        // Validasi input
        $request->validate([
            'username' => 'required|unique:koordinators|unique:admins|unique:kurirs|unique:pemiliks|unique:keuangans',
            'password' => 'required|string',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'user_type' =>'required',
            'area_id' => 'required'
        ], [
            'username.unique' => 'Username sudah digunakan.',
            'nama.regex' => 'Nama hanya boleh diisi dengan huruf.',
        ]);

        $area = Area_Distribusi::where('id', $request->area_id)->first();

        if($area){
             // Buat koordinator baru
            Kurir::create([
                'username' => $request->username,
                'password' => Crypt::encryptString($request->password),
                'nama' => $request->nama,
                'user_type' => $request->user_type,
                'area_id' => $area->id
            ]);

            return response()->json(['message' => 'Kurir berhasil didaftarkan']);

        }

        return response()->json(['message' => 'area tidak ditemukan']);

       
    }

    public function updateKurir(Request $request, $id_kurir)
    {
        $kurir = Kurir::find($id_kurir);

        if (!$kurir) {
            return response()->json(['message' => 'Kurir tidak ditemukan'], 404);
        }

        $request->validate([
            'username' => 'required|unique:kurirs,username,' . $kurir->id_kurir . ',id_kurir',
            'password' => 'required',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'user_type' =>'required',
            'area_id' => 'required'
        ], [
            'nama.regex' => 'Nama hanya boleh diisi dengan huruf.',
        ]);

         // Memastikan username tidak ada yang sama di tabel admin, kurir, dan koordinator
         if (
            Admin::where('username', $request->username)->exists() ||
            Kurir::where('username', $request->username)->where('id_kurir', '<>', $kurir->id_kurir)->exists() ||
            Koordinator::where('username', $request->username)->exists() ||
            Pemilik::where('username', $request->username)->exists() ||
            Keuangan::where('username', $request->username)->exists()
        ) {
            return response()->json(['message' => 'Username sudah digunakan pada tabel lain'], 422);
        }

        $area = Area_Distribusi::where('area_id', $request->area_id)->first();

        if($kurir){
            $kurir->update([
                'username' => $request->username,
                'password' => Crypt::encryptString($request->password),
                'nama' => $request->nama,
                'user_type' => $request->user_type,
                'area_id' => $area->area_id
            ]);
    
            return response()->json(['message' => 'Kurir berhasil diperbarui']);
        }

        
    }

    public function deleteKurir($id_kurir)
    {
        $kurir = Kurir::find($id_kurir);

        if (!$kurir) {
            return response()->json(['message' => 'Kurir tidak ditemukan'], 404);
        }

        $lapaks = Lapak::where('id_kurir', $id_kurir)->get();

        foreach ($lapaks as $lapak) {
            $transaksi = Transaksi::where('kode_lapak', $lapak->kode_lapak)->get();

            foreach ($transaksi as $transaksi1) {
                $transaksi1->delete();
            }

            $lapak->delete();
        }

        $kurir->delete();

        return response()->json(['message' => 'Kurir berhasil dihapus']);
    }

}
