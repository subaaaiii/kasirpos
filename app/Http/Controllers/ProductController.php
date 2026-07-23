<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Products/index', [
            'products' => $products,
            'categories' => Category::select('id', 'name')->get(),
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Form', [
            'categories' => Category::latest()->get(),
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['image'] = $request->file('image')->store('products', 'public');
        $data['is_active'] = true;

        Product::create($data);
        return redirect()->route('products.index')->with(["success" => "Data behasil disimpan"]);
    }
    public function edit(Product $product)
    {
        return Inertia::render('Products/Form', [
            'categories' => Category::latest()->get(),
            "product" => $product->load('category')
        ]);
    }
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
            Storage::disk('public')->delete($product->image);
        } else {
            unset($data['image']);
        }
        $product->update($data);

        return redirect()->back()->with(["success" => "Data behasil disimpan"]);
    }

    public function destroy(Product $product)
    {
        Storage::disk('public')->delete($product->image);

        $product->delete();

        return redirect()->route('products.index')->with(['success' => 'Data Berhasil Dihapus!']);
    }


    public function topProducts(Request $request)
    {
        $period = $request->period ?? 'day';

        $query = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('products', 'order_items.product_id', '=', 'products.id');

        switch ($period) {
            case 'week':
                $query->whereDate('orders.created_at', '>=', Carbon::today()->subDays(6));
                break;

            case 'month':
                $query->whereMonth('orders.created_at', Carbon::now()->month)
                    ->whereYear('orders.created_at', Carbon::now()->year);
                break;

            default: 
                $query->whereDate('orders.created_at', Carbon::today());
                break;
        }

        $topProducts = $query
            ->select(
                'products.id',
                'products.name',
                'products.image',
                DB::raw('SUM(order_items.qty) as total_sold'),
                DB::raw('SUM(order_items.qty * order_items.price) as revenue')
            )
            ->groupBy(
                'products.id',
                'products.name',
                'products.image'
            )
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        return response()->json($topProducts);
    }
}
