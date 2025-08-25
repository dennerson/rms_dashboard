<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Web\ViewController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/rms-web', function () {
        return Inertia::render('RmsWeb');
    })->name('RmsWeb');

    Route::get('/rms-quote', function () {
        return Inertia::render('RmsQuote');
    })->name('RmsQuote');

    Route::get('/rms-client-data', function () {
        return Inertia::render('RmsClientList');
    })->name('RmsClientData');

    Route::get('/rms-branch-list', function () {
        return Inertia::render('RmsBranchList');
    })->name('RmsBranchList');

    // test display data
    // Route::get('/clients', [ViewController::class, 'showClients']);
    // Route::get('/zipcodes', [ViewController::class, 'showZipCodes']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';