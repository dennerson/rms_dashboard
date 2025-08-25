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
Route::post('/clients/upload', [ApiController::class, 'uploadFileToClient']);

Route::get('/branches', [ApiController::class, 'getBranch']);
Route::post('/branches', [ApiController::class, 'createBranch']);
Route::put('/branches/{zip_code}', [ApiController::class, 'updateBranch']);
Route::delete('/branches/{zip_code}', [ApiController::class, 'deleteBranch']);
Route::post('/branches/upload', [ApiController::class, 'uploadFileToBranch']);
