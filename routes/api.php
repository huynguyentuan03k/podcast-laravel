<?php
use App\Http\Controllers\Api\UserController;

use Illuminate\Support\Facades\Route;
use Inertia\Middleware;
use App\Http\Middleware\EnsureTokenIsValid;

Route::get("/hello-world", fn() => ["message" => "Hello World"])->middleware(EnsureTokenIsValid::class);


Route::get("/users", [UserController::class, "index"]);


Route::get("/users/{user}", [UserController::class, "show"]);
Route::post("/users", [UserController::class, "store"]);
Route::put("users/{user}",[UserController::class,'update']);
Route::delete("users/{user}",[UserController::class,'destroy']);

// api protected get profile user
Route::middleware('auth:sanctum')->get('/profile',[UserController::class,'show']);


// api get profile use php artisan install:api 
// after create a table in folder migrations and a file in folder config , that name is sanctum.php
// Route:Middleware::get("auth:sanctum")->get("/profile", function(Request $request){
//     return $request->user();
// });