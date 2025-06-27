<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/rms-web', function () {
        return Inertia::render('rms_web');
    })->name('RmsWeb');

    Route::get('/rms-quote', function () {
        return Inertia::render('rms_quote');
    })->name('RmsQuote');

    Route::get('/rms-client-data', function () {
        return Inertia::render('rms_client_data');
    })->name('RmsClientData');

    Route::get('/rms-branch-list', function () {
        return Inertia::render('rms_branch_list');
    })->name('RmsBranchList');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';