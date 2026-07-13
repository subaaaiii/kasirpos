<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});
Route::get('/products', function () {
    return Inertia::render('Products/index');
});
Route::get('/products/create', function () {
    return Inertia::render('Products/Create');
});
Route::get('/sales', function () {
    return Inertia::render('Sales/Index');
});
Route::get('/orders/', function () {
    return Inertia::render('Orders/Index');
});
