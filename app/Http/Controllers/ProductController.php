<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        return Inertia::render('Products/index',[
            'products' => Product::latest()->paginate(20),
        ]);
    }

    public function create(){
        return Inertia::render('Products/Create', [
            'categories' => Category::latest()->get(),
        ]);
    }

    public function store(StoreProductRequest $request){
        $data = $request->validated();
        $data['image'] = $request->file('image')->store('products', 'public');

        Product::create($data);
        return redirect()->route('Products.index')->with(["success" => "Data behasil disimpan"]);
    }
    public function show(int $id){
        $product = Product::find($id);
        return Inertia::render('Product/Create', compact('product'));
    }
    public function update(UpdateProductRequest $request, Product $product){
        $data = $request->validated();
        if ($request->hasFile('image')){
            $data['image'] = $request->file('image')->store('products','public');
            Storage::disk('public')->delete($product->image);
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
}
