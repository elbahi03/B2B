<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\StoreController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// route : auth .
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

// Route : Role .
Route::get('/roles', [RoleController::class, 'index'])->middleware('auth:sanctum');
Route::get('/roles-users', [RoleController::class, 'getUsers'])->middleware('auth:sanctum');
Route::get('/roles-admins', [RoleController::class, 'getAdmin'])->middleware('auth:sanctum');
Route::get('/roles-superadmins', [RoleController::class, 'getSuperadmin'])->middleware('auth:sanctum');
Route::get('/roles/{id}', [RoleController::class, 'show'])->middleware('auth:sanctum');
Route::post('/roles', [RoleController::class, 'store'])->middleware('auth:sanctum');
Route::put('/roles/{id}', [RoleController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/roles/{id}', [RoleController::class, 'destroy'])->middleware('auth:sanctum');

// Route : User .
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::get('/users/{id}', [UserController::class, 'show'])->middleware('auth:sanctum');
Route::put('/users/{id}', [UserController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('auth:sanctum');

// Route : Categorie .
Route::get('/categories', [CategorieController::class, 'index'])->middleware('auth:sanctum');
Route::get('/categories/{id}', [CategorieController::class, 'show'])->middleware('auth:sanctum');
Route::post('/categories', [CategorieController::class, 'store'])->middleware('auth:sanctum');
Route::put('/categories/{id}', [CategorieController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/categories/{id}', [CategorieController::class, 'delete'])->middleware('auth:sanctum');

// Route : Store .
Route::get('/stores', [StoreController::class, 'index']);
Route::get('/stores/{id}', [StoreController::class, 'show']);
Route::post('/stores', [StoreController::class, 'store']);
Route::put('/stores/{id}', [StoreController::class, 'update']);
Route::delete('/stores/{id}', [StoreController::class, 'delete'])->middleware('auth:sanctum');

// Route : Products .
Route::get('/products', [StoreController::class, 'index']);
Route::get('/products/{id}', [StoreController::class, 'show']);
Route::post('/products', [StoreController::class, 'store']);
Route::put('/products/{id}', [StoreController::class, 'update']);
Route::delete('/products/{id}', [StoreController::class, 'delete'])->middleware('auth:sanctum');

// Route : Ordre .
Route::get('/ordres', [StoreController::class, 'index'])->middleware('auth:sanctum');
Route::get('/ordres/{id}', [StoreController::class, 'show'])->middleware('auth:sanctum');
Route::post('/ordres', [StoreController::class, 'store'])->middleware('auth:sanctum');
Route::put('/ordres/{id}', [StoreController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/ordres/{id}', [StoreController::class, 'delete'])->middleware('auth:sanctum');
