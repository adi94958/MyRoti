<?php

namespace App\Http\Controllers;

use App\Models\Area_Distribusi;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function readArea()
    {
        $datas = Area_Distribusi::select('area_id', 'area_distribusi')->get();
      
        return response()->json($datas, 200);
    }
}
