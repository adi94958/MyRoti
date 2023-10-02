<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Kurir;
use App\Models\Koordinator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            $user = $admin;
        } elseif ($koordinator = Koordinator::where('username', $request->username)->first()) {
            $user = $koordinator;
        } elseif ($kurir = Kurir::where('username', $request->username)->first()) {
            $user = $kurir;
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if (Hash::check($request->password, $user->password)) {
            return $user->createToken('authToken')->plainTextToken;
            
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function infoLogin(Request $request) 
    {
        return response()->json(Auth::user());
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
