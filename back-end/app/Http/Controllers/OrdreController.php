<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Ordre;
use App\Models\Store;
use App\Models\User;
use App\Models\Categorie;
use App\Models\Role;
use Illuminate\Support\Facades\Log;

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

    // function : ordre de user authentifier .
    public function ordres(){
        Log::info(auth()->id());
        return response()->json(Ordre::where('user_id', auth()->id())->get());
    }

    // function : ordres de store .
    public function ordresStore(){
        $stores = Store::where('user_id', auth()->id())->get();
        if ($stores->isEmpty()) {
            return response()->json(['message' => 'Aucun store trouve']);
        }
        return response()->json(Ordre::whereIn('store_id', $stores->pluck('id'))->get());   
    }

    // verifier ordre .
    public function verifOrdre($id){
        $ordre = Ordre::find($id);
        if (!$ordre){
            return response()->json(['message' => 'Ordre non trouve'], 404);
        }
        return response()->json([
            'ordre' => $ordre
        ]);
    }

    // function : creer .
    public function store(Request $request){
        // Initialiser total
        $total = 0;
    
        // Log pour debug
        Log::info('Request data', $request->all()); // toujours un array
    
        $request->validate([
            'store_id' => 'required|integer|exists:stores,id',
            'produits_commandes' => 'required|array',
            'produits_commandes.*.products_id' => 'required|integer|exists:products,id',
            'produits_commandes.*.quantite' => 'required|integer|min:1',
        ]);
    
        foreach ($request->produits_commandes as $produit) {
            $product = Product::find($produit['products_id']);
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
            'status' => 'en cours',
        ]);
    
        Log::info('Ordre créé', ['ordre_id' => $ordre->id, 'total' => $total]); // contexte toujours array
    
        return response()->json([
            'message' => 'Ordre créé',
            'ordre' => $ordre
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
            'message' => 'Ordre modifiee',
            'ordre' => $ordre
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
            'message' => 'Ordre suprimee',
            'ordre'
        ]);
    }

}
