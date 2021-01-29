<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;

use Illuminate\Http\Request;

class DataController extends Controller
{

    /**
     * Return requested data
     * @return
     */
    public function data(Request $request){

        return response()->json([
            "msg"=> "Holla"
        ], 200);
        
    }
}