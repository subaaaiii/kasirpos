<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::with('items.product')
                ->latest()
                ->paginate(20),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        DB::transaction(function () use ($request) {

            $subtotal = 0;

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['id']);

                $subtotal += $product->price * $item['qty'];
            }

            $tax = 0.10 * $subtotal;
            $grandTotal = $subtotal + $tax;

            $order = Order::create([
                'order_number' => 'ORD-' . now()->format('YmdHis'),
                'subtotal' => $subtotal,
                'tax' => $tax,
                'grand_total' => $grandTotal,
                'payment_method' => $request->payment_method,
            ]);

            foreach ($request->items as $item) {

                $product = Product::findOrFail($item['id']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'price' => $product->price,
                    'qty' => $item['qty'],
                    'subtotal' => $product->price * $item['qty'],
                ]);

                $product->decrement('stock', $item['qty']);
            }
        });

        return to_route('cashier.index')->with('success', 'Transaksi berhasil.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
