<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class OrdersExport implements FromCollection, WithHeadings
{
    public function __construct(private ?string $date = null)
    {
    }

    public function collection()
    {
        return Order::when($this->date, function ($query) {
                $query->whereDate('created_at', Carbon::parse($this->date));
            })
            ->select([
                'order_number',
                'payment_method',
                'subtotal',
                'tax',
                'grand_total',
                'created_at',
            ])
            ->latest()
            ->get();
    }

    public function headings(): array
    {
        return [
            'Order Number',
            'Payment Method',
            'Subtotal',
            'Tax',
            'Grand Total',
            'Order Date',
        ];
    }
}