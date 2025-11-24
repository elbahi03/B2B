<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Store;


class StoreController extends Controller{
    // function : get all .
    public function index(){
        return response()->json(Store::all());
    }

    // function : get id .
    public function show($id){
        $store = Store::find($id);
        if (!$store ){
            return response()->json(['message' => 'Store non trouve']);
        }
        return response()->json([
            'message' => 'Store trouve',
            'Store' => $store
        ]);
    }

    // function : filtrage with categorie id .
    public function categorie($id){
        if (!Store::where('categorie_id', $id)->exists()){
            return response()->json(['message' => 'Store non trouve']);
        }
        return response()->json(Store::where('categorie_id', $id)->get());
    }

    // function : cree .
    public function store(Request $request){
        $valide = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'categorie_id' => 'required|integer|exists:categories,id',
            'name' => 'required|string|max:255|unique:stores,name,',
            'ville' => 'required|string|max:255',
            'localisation' => 'required|string|max:255',
            'phone' => 'required|max:13|min:10|unique:stores,phone,',
            'description' => 'required|string|max:255',
            'logo_url' => 'nullable',
        ]);
        $store = Store::create($valide);
        return response()->json([
            'message' => 'Store cree',
            'store' => $store
        ]);
    }

    // function : update .
    public function update(Request $request, $id){
        $store = Store::find($id);
        if (!$store ){
            return response()->json(['message' => 'Store non trouve']);
        }
        $valide = $request->validate([
            'categorie_id' => 'sometimes|integer|exists:categories,id',
            'name' => 'sometimes|string|max:255|unique:stores,name,',
            'ville' => 'sometimes|string|max:255',
            'localisation' => 'sometimes|string|max:255',
            'phone' => 'sometimes|max:13|min:10|unique:stores,phone,',
            'description' => 'sometimes|string|max:255',
            'logo_url' => 'nullable',
        ]);
        $store->update($valide);
        return response()->json([
            'message' => 'Store modifiee',
            'store' => $store
        ]);
    }

    // function : suprimee .
    public function delete(Request $request, $id){
        $store = Store::find($id);
        if (!$store ){
            return response()->json(['message' => 'Store non trouve']);
        }

        $store->delete();
        return response()->json(['message' => 'Store suprimee']);
    }
}
