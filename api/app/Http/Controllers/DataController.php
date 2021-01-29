<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class DataController extends Controller
{

    /**
     * Return requested data
     * @return
     */
    public function data(Request $request){

        // Validation
        $validator = Validator::make($request->all(), [
            'from' => 'required',
            'to' => 'required'
        ]);

        // Validation Failed
        if ($validator->fails()){
            return response()->json([
                "msg" => "Please specify correct values"
            ], 400);
        }

        // Validation Successful
        // Get date range from request
        $from_date= $request->input("from");
        $to_date= $request->input("to");

        // Return JSON response
        return response()->json([
            "data"=> $this->fetchData($from_date, $to_date)
        ], 200);

    }

    /**
     * Fetch requested data from CoinDesk API
     * @param String $from_date
     * @param String $to_date
     * @return String
     */
    public function fetchData($from_date, $to_date){

        $response = Http::get(
            "https://api.coindesk.com/v1/bpi/historical/close.json"
            ."?start=". $from_date . "&end=" . $to_date 
        );

        // Return useful data
        return $response->json()['bpi'];
        
    }

}