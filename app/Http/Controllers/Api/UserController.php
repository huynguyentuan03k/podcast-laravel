<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
// catch all exceptions



class UserController extends Controller
{

  // POST /api/users create user
  public function store(StoreUserRequest $request): JsonResponse
  {
      $user = User::create($request->validated());
      return response()->json($user, 201);
  }



  // GET /api/users get all 
  public function index(): JsonResponse
  {
      // dump(User::all());
      // dd("here");
      $users = User::all();
      return response()->json($users, 200);
  }



  // GET /api/users/{id} get user by id
  public function show(User $user): JsonResponse
  {
    $user = User::find($user->id);
    if(!$user){
      return response()->json(["message" => "User not found"], 404);
    }
      return response()->json($user,200);
  }



  // PUT /api/users/{id} update user by id
  public function update(UpdateUserRequest $request , User $user): JsonResponse
  {
    $user = User::find($user->id);
    if(!$user){
      return response()->json(["message" => "User not found"], 404);
    }
    $user->update($request->validated());
    return response()->json($user, 200);
  }


  // delete /api/users/{id} delete user by id
  public function destroy(User $user): JsonResponse
  {
    $user = User::find($user->id);
    if(!$user){
      return response()->json(["message"=> "user not found"], 404);
    }
    $user->delete();
    return response()->json(["message"=> "Detele user successfully"], 201);
  }

}