<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Kurir;
use App\Models\Koordinator;
use App\Models\Area_Distribusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class DataKurirController extends Controller
{
    public function readDataKurir()
    {
        
        $datas = Kurir::select('id','username', 'password', 'nama', 'area_id')
            ->join('areadistribusi', 'kurirs.area_id', '=', 'areadistribusi.id')
            ->select('kurirs.id','kurirs.username','kurirs.password', 'kurirs.nama', 'kurirs.user_type','areadistribusi.area_distribusi')
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
            'username' => 'required|unique:koordinators|unique:admins|unique:kurirs',
            'password' => 'required|string',
            'nama' => 'required',
            'user_type' =>'required',
            'area_id' => 'required'
        ], [
            'username.unique' => 'Username sudah digunakan.',
        ]);

        $area = Area_Distribusi::find($request->area_id);

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

    public function updateKurir(Request $request, $id)
    {
        $kurir = Kurir::find($id);

        if (!$kurir) {
            return response()->json(['message' => 'Kurir tidak ditemukan'], 404);
        }

        $request->validate([
            'username' => 'required|unique:kurirs,username,' . $kurir->id,
            'password' => 'required',
            'nama' => 'required',
            'user_type' =>'required',
            'area_id' => 'required'
        ]);

         // Memastikan username tidak ada yang sama di tabel admin, kurir, dan koordinator
         if (
            Admin::where('username', $request->username)->exists() ||
            Kurir::where('username', $request->username)->where('id', '<>', $kurir->id)->exists() ||
            Koordinator::where('username', $request->username)->exists()
        ) {
            return response()->json(['message' => 'Username sudah digunakan pada tabel lain'], 422);
        }

        $kurir->update([
            'username' => $request->username,
            'password' => Crypt::encryptString($request->password),
            'nama' => $request->nama,
            'user_type' => $request->user_type,
            'area_id' => $request->area
        ]);

        return response()->json(['message' => 'Kurir berhasil diperbarui']);
    }

    public function deleteKurir($id)
    {
        $kurir = Kurir::find($id);

        if (!$kurir) {
            return response()->json(['message' => 'Kurir tidak ditemukan'], 404);
        }

        $kurir->delete();

        return response()->json(['message' => 'Kurir berhasil dihapus']);
    }
}
