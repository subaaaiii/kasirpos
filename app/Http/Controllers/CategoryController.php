<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);
        Category::create($validated);
        return redirect()->back()->with(["success" => "added to categories"]);
    }
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $category->update($validated);
        return redirect()->back()->with(["success" => "category updated"]);
    }
}
