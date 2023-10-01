<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class DataKoordinatorController extends Controller
{
    public function index()
    {
        // Mengambil data koordinator dari tabel 'koordinator'
        $koordinators = DB::table('koordinator')->select('username', 'nama', 'password')->get();
        // Mendekripsi password sebelum menampilkan
        foreach ($koordinators as $koordinator) {
            $koordinator->password = Crypt::decryptString($koordinator->password);
        }
        return view('datakoor', compact('koordinators'));
    }
    public function edit()
    {
        // 
    }

    public function delete()
    {
        // 
    }
}
