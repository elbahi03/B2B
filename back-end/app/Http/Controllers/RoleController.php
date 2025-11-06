<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleController extends Controller
{
    // function : get all
    public function index(){
        return response()->json(Role::all());
    }

    // function : get user 
    public function getUsers(){
        $users = Role::where('role', 'user')->get();
        return response()->json($users);
    }

    // function : get admin
    public function getadmin(){
        $admin = Role::where('role', 'admin')->get();
        return response()->json($admin);
    }

    // function : get super admin
    public function getSuperadmin(){
        $admin = Role::where('role', 'admin')->get();
        return response()->json($admin);
    }

    // function : get avec id 
    public function show($id){
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        return response()->json($role);
    }

    // function : creer .
    public function store(Request $request){
        $request->validate([
            'role' => 'required|in:user,emp,admin',
        ]);
        $role = Role::create($request->only(['role', 'user_id']));
        return response()->json(['message' => 'Role created', 'data' => $role], 201);
    }

    // function : modifier .
    public function update(Request $request, $id){
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'not found 404'], 404);
        }
        $request->validate([
            'role' => 'in:user,emp,admin',
            'user_id' => 'exists:users,id'
        ]);
        $role->update($request->only(['role', 'user_id']));
        return response()->json(['message' => 'Role updated', 'data' => $role]);
    }

    // function : suprimmer 
    public function destroy($id){
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'not found 404'], 404);
        }
        $role->delete();
        return response()->json(['message' => 'Role deleted']);
    }

}
