<?php

namespace App\Http\Controllers;

use App\Exports\OrdersExport;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->date ?? Carbon::today()->toDateString();
        $orders = Order::with('items.product')
            ->when($request->search, function ($query, $search) {
                $query->where('order_number', 'like', "%{$search}%");
            })
            ->when($request->payment_method, function ($query, $paymentMethod) {
                $query->where('payment_method', $paymentMethod);
            })
            ->whereDate('created_at', $date)
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only([
                'search',
                'payment_method',
                'date',
            ]),
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

    public function export(Request $request)
    {
        $filename = 'orders-' . Carbon::now()->format('d-m-Y') . '.xlsx';
        return Excel::download(
            new OrdersExport($request->date),
            $filename
        );
    }
}
