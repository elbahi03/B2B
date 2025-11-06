<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use OpenApi\Annotations as OA;

class UserController extends Controller
{
    // function : login .
    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    // function : register 
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required'
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], Response::HTTP_CREATED);
    }

    // function : logout 
    public function legout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    // function : get all
    public function index(){
        return response()->json(User::all());
    }

    // function : get avec id 
    public function show($id){
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        return response()->json($user);
    }

    // function : post
    public function update(Request $request, $id){
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email',
            'password' => 'sometimes|min:6',
        ]);
        $data = $request->only(['name', 'email']);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }
        $user->update($data);
        return response()->json(['message' => 'Utilisateur mis à jour', 'user' => $user]);
    }

    // function : supprimer le compte 
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé']);
    } 

}
