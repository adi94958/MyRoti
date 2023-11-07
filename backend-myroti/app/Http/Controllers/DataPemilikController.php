<?php

namespace App\Http\Controllers;

use App\Models\Pemilik;
use App\Models\Kurir;
use App\Models\Koordinator;
use App\Models\Admin;
use App\Models\Keuangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class DataPemilikController extends Controller
{
    public function readDataPemilik()
    {
        $datas = Pemilik::select('id_pemilik', 'username', 'password', 'nama',)->get();
        foreach ($datas as $data) {
            $data->password = Crypt::decryptString($data->password);
        }
        return response()->json($datas, 200);
    }

    public function registerPemilik(Request $request)
    {
        // Validasi input
        $request->validate([
            'username' => 'required|unique:pemiliks|unique:kurirs|unique:keuangans|unique:admins|unique:koordinators', // Pastikan Anda telah mengganti nama tabel sesuai dengan nama yang sesuai
            'password' => 'required',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'user_type' => 'required'
        ], [
            'username.unique' => 'Username sudah digunakan.',
            'nama.regex' => 'Nama hanya boleh diisi dengan huruf.',
        ]);

        // Buat pemilik baru
        Pemilik::create([
            'username' => $request->username,
            'password' => Crypt::encryptString($request->password),
            'nama' => $request->nama,
            'user_type' => $request->user_type
        ]);

        return response()->json(['message' => 'Pemilik berhasil didaftarkan']);
    }

    public function updatePemilik(Request $request, $id)
    {
        $pemilik = Pemilik::find($id);

        if (!$pemilik) {
            return response()->json(['message' => 'Pemilik tidak ditemukan'], 404);
        }

        $request->validate([
            'username' => 'required|unique:pemiliks,username,' . $pemilik->id_pemilik . ',id_pemilik', 
            'password' => 'required',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'user_type' => 'required'
        ],[
            'nama.regex' => 'Nama hanya boleh diisi dengan huruf.',
        ]);

        // Memastikan username tidak ada yang sama di tabel admin, kurir, dan koordinator
        if (
            Admin::where('username', $request->username)->exists() ||
            Kurir::where('username', $request->username)->exists() ||
            Koordinator::where('username', $request->username)->exists() ||
            Pemilik::where('username', $request->username)->where('id_pemilik', '<>', $pemilik->id_pemilik)->exists() ||
            Keuangan::where('username', $request->username)->exists()
        ) {
            return response()->json(['message' => 'Username sudah digunakan pada tabel lain'], 422);
        }

        $pemilik->update([
            'username' => $request->username,
            'password' => Crypt::encryptString($request->password),
            'nama' => $request->nama,
            'user_type' => $request->user_type
        ]);

        return response()->json(['message' => 'Pemilik berhasil diperbarui']);
    }

    public function deletePemilik($id)
    {
        $pemilik = Pemilik::find($id);

        if (!$pemilik) {
            return response()->json(['message' => 'Pemilik tidak ditemukan'], 404);
        }

        $pemilik->delete();

        return response()->json(['message' => 'Pemilik berhasil dihapus']);
    }
}
