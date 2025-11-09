<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // function : get all .
    public function index(){
        return response()->json(Product::all());
    }

    // function : get id .
    public function show($id){
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product non trouvee'], 404);
        }
        return response()->json($product);
    }

    // function : creer .
    public function store(Request $request){
        $valide = $request->validate([
            'store_id' => 'required|integer|exists:stores,id',
            'img_url' => 'nullable',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'stoke' => 'required|integer|min:30',
            'min' => 'required|integer',
            'prix_achat' => 'required|numeric',
            'prix_vente' => 'required|numeric',
        ]);
        $product = Product::create($valide);
        return response()->json(['product est cree' => $product ]);
    }

    // function : update .
    public function update(Request $request, $id){
        $product = Product::find($id);
        if (!$product){
            return response()->json(['message' => 'Product non trouvee'], 404);
        }
        $valide = $request->validate([
            'store_id' => 'sometimes|integer|exists:stores,id',
            'img_url' => 'nullable',
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|max:255',
            'stoke' => 'sometimes|integer|min:30',
            'min' => 'sometimes|integer',
            'prix_achat' => 'sometimes|numeric',
            'prix_vente' => 'sometimes|numeric',
        ]);
        $product->update($valide);
        return response()->json(['product est modifiee' => $product ]);
    }

    // function : suprimee .
    public function delete(Request $request, $id){
        $product = Product::find($id);
        if (!$product){
            return response()->json(['message' => 'Product non trouvee'], 404);
        }
        $product->delete();
        return response()->json(['product est suprimee' => $product ]);
    }


}
