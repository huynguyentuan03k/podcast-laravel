<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

Route::get('/', function (): InertiaResponse {
    return Inertia::render('welcome');
})->name('home');

// Route::get('/profile', function (): InertiaResponse {
//     return Inertia::render('profile');
// })->middleware(['auth','verified']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


// dashboard user
Route::get('/profile',function (): InertiaResponse{
    return Inertia::render('profile');
});

Route::get('/createUser', fn(): InertiaResponse =>
    Inertia::render('createUser')
);

Route::get('/listUser',fn(): InertiaResponse => 
    Inertia::render('listUser')
);

// Route::get('/users/edit/{id}', function ($id): InertiaResponse {
//     return Inertia::render('updateUser', ['id' => $id]);
// });

Route::get('/users/edit/{id}', function ($id): InertiaResponse {
    return Inertia::render('updateUser', ['id' => $id]);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
