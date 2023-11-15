<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Keuangan;
use App\Models\Kurir;
use App\Models\Koordinator;
use App\Models\Pemilik;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'string|required',
            'password' => 'string|required',
        ]);

        $user = null;

        if ($admin = Admin::where('username', $request->username)->first()) {
            $decryptedPassword = Crypt::decryptString($admin->password);
            if ($request->password == $decryptedPassword) {
                $user = $admin;
            } else {
                return response()->json([
                    'message' => 'Password salah'
                ], Response::HTTP_UNAUTHORIZED);
            }
        } elseif ($koordinator = Koordinator::where('username', $request->username)->first()) {
            $decryptedPassword = Crypt::decryptString($koordinator->password);
            if ($request->password == $decryptedPassword) {
                $user = $koordinator;
            } else {
                return response()->json([
                    'message' => 'Password salah'
                ], Response::HTTP_UNAUTHORIZED);
            }
        } elseif ($kurir = Kurir::where('username', $request->username)->first()) {
            $decryptedPassword = Crypt::decryptString($kurir->password);
            if ($request->password == $decryptedPassword) {
                $user = $kurir;
            } else {
                return response()->json([
                    'message' => 'Password salah'
                ], Response::HTTP_UNAUTHORIZED);
            }
        } elseif ($keuangan = Keuangan::where('username', $request->username)->first()){
            $decryptedPassword = Crypt::decryptString($keuangan->password);
            if ($request->password == $decryptedPassword) {
                $user = $keuangan;
            } else {
                return response()->json([
                    'message' => 'Password salah'
                ], Response::HTTP_UNAUTHORIZED);
            }

        } elseif ($pemilik = Pemilik::where('username', $request->username)->first()) {
            $decryptedPassword = Crypt::decryptString($pemilik->password);
            if ($request->password == $decryptedPassword) {
                $user = $pemilik;
            } else {
                return response()->json([
                    'message' => 'Password salah'
                ], Response::HTTP_UNAUTHORIZED);
            }

        } else {
            return response()->json([
                'message' => 'Akun tidak ditemukan'
            ], Response::HTTP_NOT_FOUND);
        }

        Auth::login($user);
        $datas = $user;
        return response()->json([
            'message' => 'Berhasil masuk',
            'user' => $datas,
            'response' => 200   
        ]);
    }


    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'message' => 'Berhasil logout'
        ], Response::HTTP_OK);
    }
}
