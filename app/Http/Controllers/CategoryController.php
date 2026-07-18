<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);
        Category::create($validated);
        return redirect()->back()->with(["success" => "Added to categories"]);
    }
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $category->update($validated);
        return redirect()->back()->with(["success" => "Category updated"]);
    }
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->back()->with(["success" => "Category deleted"]);
    }
}
