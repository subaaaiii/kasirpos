<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:500',
            'image' => 'required|image|mimes:png,jpg,webp,jpeg,gif,svg|max:2048',
            'stock' => 'required|numeric|min:1',
            'is_active' => 'required|boolean',
        ];
    }
}
