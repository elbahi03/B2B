<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use app\models\Categorie;

class CategorieController extends Controller
{
    // function : get all .
    public function index(){
        return response()->json(Categorie::all());
    }

    // function : get avec id .
    public function show($id){
        $categorie = Categorie::find($id);
        if (!$categorie) {
            return response()->json(['message' => 'Categorie non trouve'], 404);
        }
        return response()->json([
            'categorie' -> $categorie
        ]);
    }

    // function : creer .
    public function store(Request $request){
        $valide = $request->validate([
            'categorie' => 'required|string|unique:categories',
        ]);
        $categorie = Categorie::create([ $valide ]);
        return response()->json([
            'categorie est cree' -> $categorie
        ]);
    }

    // function : update .
    public function update(Request $request, $id){
        $categorie = Categoire::find($id);
        if (!$categorie){
            return response()->json(['message' => 'Categorie non trouve'], 404);
        }
        $valide = $request->validate([
            'categorie' => 'required|string|unique:categories',
        ]);
        $categorie->update($valide);
        return response()->json([
            'categorie est modifiee' -> $categorie
        ]);
    }

    // function : delete .
    public function delete(Request $request, $id){
        $categorie = Categoire::find($id);
        if (!$categorie){
            return response()->json(['message' => 'Categorie non trouve'], 404);
        }
        $categorie->delete();
        return response()->json([
            'categorie est suprimee'
        ]);
    }
    
    
}
