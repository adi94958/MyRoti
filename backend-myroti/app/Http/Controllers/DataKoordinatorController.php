<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Kurir;
use App\Models\Koordinator;
use App\Models\Pemilik;
use App\Models\Keuangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class DataKoordinatorController extends Controller
{
    public function readDataKoordinator()
    {
        $datas = Koordinator::select('id', 'username', 'password', 'nama')->get();
        foreach ($datas as $data) {
            $data->password = Crypt::decryptString($data->password);
        }
        return response()->json($datas, 200);
    }


    public function registerKoordinator(Request $request)
    {
        // Validasi input
        $request->validate([
            'username' => 'required|unique:koordinators|unique:admins|unique:kurirs|unique:keuangans|unique:kurirs',
            'password' => 'required',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'user_type' =>'required',
        ], [
            'username.unique' => 'Username sudah digunakan.',
            'nama.regex' => 'Nama hanya boleh diisi dengan huruf.',
        ]);

        // Buat koordinator baru
        Koordinator::create([
            'username' => $request->username,
            'password' => Crypt::encryptString($request->password),
            'nama' => $request->nama,   
            'user_type' => $request->user_type
        ]);

        return response()->json(['message' => 'Koordinator berhasil didaftarkan']);
    }


    public function updateKoordinator(Request $request, $id)
    {
        $koordinator = Koordinator::find($id);

        if (!$koordinator) {
            return response()->json(['message' => 'Koordinator tidak ditemukan'], 404);
        }

        $request->validate([
            'username' => 'required|unique:koordinators,username,' . $koordinator->id,
            'password' => 'required',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'user_type' =>'required',
        ],[
            'nama.regex' => 'Nama hanya boleh diisi dengan huruf.',
        ]);

         // Memastikan username tidak ada yang sama di tabel admin, kurir, dan koordinator
         if (
            Admin::where('username', $request->username)->exists() ||
            Kurir::where('username', $request->username)->exists() ||
            Pemilik::where('username', $request->username)->exists() ||
            Keuangan::where('username', $request->username)->exists() ||
            Koordinator::where('username', $request->username)->where('id', '<>', $koordinator->id)->exists()
        ) {
            return response()->json(['message' => 'Username sudah digunakan pada tabel lain'], 422);
        }

        $koordinator->update([
            'username' => $request->username,
            'password' => Crypt::encryptString($request->password),
            'nama' => $request->nama,
            'user_type' => $request->user_type
        ]);

        return response()->json(['message' => 'Koordinator berhasil diperbarui']);
    }

    public function deleteKoordinator($id)
    {
        $koordinator = Koordinator::find($id);

        if (!$koordinator) {
            return response()->json(['message' => 'Koordinator tidak ditemukan'], 404);
        }

        $koordinator->delete();

        return response()->json(['message' => 'Koordinator berhasil dihapus']);
    }
}
