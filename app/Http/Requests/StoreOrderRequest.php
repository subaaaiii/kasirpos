<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'payment_method' => 'required|in:cash,qris,card',

            'items' => 'required|array|min:1',

            'items.*.id' => 'required|exists:products,id',

            'items.*.qty' => 'required|integer|min:1',
        ];
    }
}
