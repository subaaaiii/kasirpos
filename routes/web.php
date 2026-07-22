<?php

use App\Http\Controllers\CashierController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SalesController;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});
// Route::get('/products', function () {
//     return Inertia::render('Products/index');
// });
// Route::get('/products/create', function () {
//     return Inertia::render('Products/Create');
// });

// Route::get('/cashier', function () {
//     return Inertia::render('Cashier/Index');
// });

Route::get('/cashier', [CashierController::class, 'index'])->name('cashier.index');

Route::get('/sales/export', [SalesController::class, 'export'])
    ->name('sales.export');
Route::get('/sales', [SalesController::class, 'index'])->name('sales.index');


Route::resource('categories', CategoryController::class)
    ->only(['store', 'update', 'destroy']);

Route::resource('products', ProductController::class);

// Route::get('/sales', function () {
//     return Inertia::render('Sales/Index');
// });
// Route::get('/orders/', function () {
//     return Inertia::render('Orders/Index');
// });

Route::get('/orders/export', [OrderController::class, 'export'])
    ->name('orders.export');

Route::resource('orders', OrderController::class);
