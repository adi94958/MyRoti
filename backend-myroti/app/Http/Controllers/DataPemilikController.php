<?php

namespace App\Http\Controllers;

use App\Models\Pemilik;
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
            'username' => 'required|unique:pemiliks', // Pastikan Anda telah mengganti nama tabel sesuai dengan nama yang sesuai
            'password' => 'required',
            'nama' => 'required',
            'user_type' => 'required'
        ], [
            'username.unique' => 'Username sudah digunakan.',
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
            'username' => 'required|unique:pemiliks,username,' . $pemilik->id, // Pastikan Anda telah mengganti nama tabel sesuai dengan nama yang sesuai
            'password' => 'required',
            'nama' => 'required',
            'user_type' => 'required'
        ]);

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
