<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Kurir;
use App\Models\Keuangan;
use App\Models\Koordinator;
use App\Models\Pemilik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class DataKeuanganController extends Controller
{
    public function readDataKeuangan()
    {
        $datas = Keuangan::select('id', 'username', 'password', 'nama')->get();
        foreach ($datas as $data) {
            $data->password = Crypt::decryptString($data->password);
        }
        return response()->json($datas, 200);
    }


    public function registerKeuangan(Request $request)
    {
        // Validasi input
        $request->validate([
            'username' => 'required|unique:koordinators|unique:admins|unique:kurirs|unique:pemiliks|unique:keuangans',
            'password' => 'required',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'user_type' =>'required',
        ], [
            'username.unique' => 'Username sudah digunakan.',
            'nama.regex' => 'Nama hanya boleh diisi dengan huruf.',
        ]);

        // Buat koordinator baru
        Keuangan::create([
            'username' => $request->username,
            'password' => Crypt::encryptString($request->password),
            'nama' => $request->nama,   
            'user_type' => $request->user_type
        ]);

        return response()->json(['message' => 'Keuangan berhasil didaftarkan']);
    }


    public function updateKeuangan(Request $request, $id)
    {
        $keuangan = Keuangan::find($id);

        if (!$keuangan) {
            return response()->json(['message' => 'Keuangan tidak ditemukan'], 404);
        }

        $request->validate([
            'username' => 'required|unique:keuangans,username,' . $keuangan->id,
            'password' => 'required',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'user_type' =>'required',
        ], [
            'nama.regex' => 'Nama hanya boleh diisi dengan huruf.',
        ]);

         // Memastikan username tidak ada yang sama di tabel admin, kurir, dan koordinator
         if (
            Admin::where('username', $request->username)->exists() ||
            Kurir::where('username', $request->username)->exists() ||
            Koordinator::where('username', $request->username)->exists() ||
            Pemilik::where('username', $request->username)->exists() ||
            Keuangan::where('username', $request->username)->where('id', '<>', $keuangan->id)->exists()

        ) {
            return response()->json(['message' => 'Username sudah digunakan pada tabel lain'], 422);
        }

        $keuangan->update([
            'username' => $request->username,
            'password' => Crypt::encryptString($request->password),
            'nama' => $request->nama,
            'user_type' => $request->user_type
        ]);

        return response()->json(['message' => 'Keuangan berhasil diperbarui']);
    }

    public function deleteKeuangan($id)
    {
        $keuangan = Keuangan::find($id);

        if (!$keuangan) {
            return response()->json(['message' => 'Keuangan tidak ditemukan'], 404);
        }

        $keuangan->delete();

        return response()->json(['message' => 'Keuangan berhasil dihapus']);
    }
}
