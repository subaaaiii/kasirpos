<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashierController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category')
            ->where('is_active', true)
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->latest()
            ->paginate(30)
            ->withQueryString();

        return Inertia::render('Cashier/Index', [
            'products' => $products,
            'categories' => Category::select('id', 'name')->get(),
            'filters' => $request->only(['search', 'category']),
        ]);
    }
}
