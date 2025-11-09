<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrdreController extends Controller
{
    // function : get all .
    public function index(){
        return response()->json(Ordre::all());
    }

    // function : get avec id .
    public function show($id){
        $ordre = Ordre::find($id);
        if (!$ordre) {
            return response()->json(['message' => 'Ordre non trouve'], 404);
        }
        return response()->json([
            'ordre' => $ordre
        ]);
    }

    // function : cree .
    public function store(Request $request){
        $request->validate([
            'store_id' => 'required|exists:stores,id'| 'integer',
            'produits_commandes' => 'required|array',
            'produits_commandes.*.produit_id' => 'required|exists:produits,id'| 'integer',
            'produits_commandes.*.quantite' => 'required|integer',
            'status' => 'required|in:en cours,terminee,annulee',
        ]);
        foreach ($request->produits_commandes as $produit) {
            $product = Product::find($produit['produit_id']);
            if (!$product) {
                return response()->json(['error' => "Produit non trouvé"], 404);
            }
            $total += $product->prix_vente * $produit['quantite'];
        }
        $ordre = Ordre::create([
            'user_id' => auth()->id(),
            'store_id' => $request->store_id,
            'produits_commandes' => $request->produits_commandes,
            'prix_total' => $total,
            'status' => $request->status
        ]);
        return response()->json([
            'ordre est cree' => $ordre
        ]);
    }

    // function : modifiee .
    public function update(Request $request, $id){
        $ordre = Ordre::find($id);
        if (!$ordre){
            return response()->json(['message' => 'Ordre non trouve'], 404);
        }
        $valide = $request->validate([
            'status' => 'required|in:en cours,terminee,annulee',
        ]);
        $ordre->update($valide);
        return response()->json([
            'ordre est modifiee' => $ordre
        ]);
    }

    // function : suprimee .
    public function delete(Request $request, $id){
        $ordre = Ordre::find($id);
        if (!$ordre){
            return response()->json(['message' => 'Ordre non trouve'], 404);
        }
        $ordre->delete();
        return response()->json([
            'ordre est suprimee'
        ]);
    }

}
