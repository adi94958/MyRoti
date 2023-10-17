<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Kurir;
use App\Models\Koordinator;
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
                    'message' => 'Invalid password'
                ], Response::HTTP_UNAUTHORIZED);
            }
        } elseif ($koordinator = Koordinator::where('username', $request->username)->first()) {
            $decryptedPassword = Crypt::decryptString($koordinator->password);
            if ($request->password == $decryptedPassword) {
                $user = $koordinator;
            } else {
                return response()->json([
                    'message' => 'Invalid password'
                ], Response::HTTP_UNAUTHORIZED);
            }
        } elseif ($kurir = Kurir::where('username', $request->username)->first()) {
            $decryptedPassword = Crypt::decryptString($kurir->password);
            if ($request->password == $decryptedPassword) {
                $user = $kurir;
            } else {
                return response()->json([
                    'message' => 'Invalid password'
                ], Response::HTTP_UNAUTHORIZED);
            }
        } else {
            return response()->json([
                'message' => 'Invalid credentials'
            ], Response::HTTP_NOT_FOUND);
        }

        Auth::login($user);
        $datas = $user::select('username', 'user_type')->first();
        return response()->json([
            'message' => 'Successfully logged in',
            'user' => $datas,
            'response' => 200   
        ]);
    }


    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ], Response::HTTP_OK);
    }
}
