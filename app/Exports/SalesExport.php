<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class SalesExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    public function __construct(
        protected int $month,
        protected int $year
    ) {}

    public function collection()
    {
        $items = DB::table('order_items')
            ->select(
                'order_id',
                DB::raw('SUM(qty) as items_sold')
            )
            ->groupBy('order_id');

        return Order::query()
            ->leftJoinSub($items, 'items', function ($join) {
                $join->on('orders.id', '=', 'items.order_id');
            })
            ->select(
                DB::raw('DATE(orders.created_at) as date'),
                DB::raw('COUNT(orders.id) as transactions'),
                DB::raw('SUM(orders.grand_total) as revenue'),
                DB::raw('SUM(COALESCE(items.items_sold, 0)) as items_sold')
            )
            ->whereYear('orders.created_at', $this->year)
            ->whereMonth('orders.created_at', $this->month)
            ->groupBy(DB::raw('DATE(orders.created_at)'))
            ->orderByDesc(DB::raw('DATE(orders.created_at)'))
            ->get();
    }

    public function headings(): array
    {
        return [
            'Date',
            'Transactions',
            'Revenue',
            'Items Sold',
        ];
    }
}