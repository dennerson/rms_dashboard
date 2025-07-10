<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

use App\Http\Controllers\ApiController;

Route::get('/clients', [ApiController::class, 'getClients']);
Route::post('/clients', [ApiController::class, 'createClient']);
Route::put('/clients/{id}', [ApiController::class, 'updateClient']);
Route::delete('/clients/{id}', [ApiController::class, 'deleteClient']);
Route::post('/clients/upload', [ApiController::class, 'uploadFile']);

Route::get('/zipcodes', [ApiController::class, 'getZipcodes']);
Route::post('/save-data', [ApiController::class, 'saveZipCodeData']);
// Route::post('/clients/upload', [ApiController::class, 'uploadFile']);


// Route::get('/ping', fn() => response()->json(['status' => 'ok']));