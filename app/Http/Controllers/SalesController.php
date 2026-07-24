<?php

namespace App\Http\Controllers;

use App\Exports\SalesExport;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class SalesController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->month ?? now()->month;
        $year = $request->year ?? now()->year;

        $items = DB::table('order_items')
            ->select(
                'order_id',
                DB::raw('SUM(qty) as items_sold')
            )
            ->groupBy('order_id');

        $sales = Order::query()
            ->leftJoinSub($items, 'items', function ($join) {
                $join->on('orders.id', '=', 'items.order_id');
            })
            ->select(
                DB::raw('DATE(orders.created_at) as date'),
                DB::raw('COUNT(orders.id) as transactions'),
                DB::raw('SUM(orders.grand_total) as revenue'),
                DB::raw('SUM(COALESCE(items.items_sold, 0)) as items_sold')
            )
            ->whereYear('orders.created_at', $year)
            ->whereMonth('orders.created_at', $month)
            ->groupBy(DB::raw('DATE(orders.created_at)'))
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $result = $sales
            ->sortKeysDesc()
            ->map(function ($sale) {
                return [
                    'date' => $sale->date,
                    'transactions' => $sale->transactions,
                    'revenue' => $sale->revenue,
                    'items_sold' => $sale->items_sold,
                ];
            })
            ->values();
        $years = Order::selectRaw('YEAR(created_at) as year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year');

        return Inertia::render('Sales/Index', [
            'sales' => $result,
            'filters' => [
                'month' => $month,
                'year' => $year,
            ],
            'years' => $years,
        ]);
    }
    public function export(Request $request)
    {
        $month = $request->month ?? now()->month;
        $year = $request->year ?? now()->year;
        return Excel::download(
            new SalesExport((int)$request->month, (int)$request->year),
            "sales-{$year}-{$month}.xlsx"
        );
    }
    private function compareWithPrevious(callable $callback)
    {
        $today = Carbon::today()->toDateString();

        $lastDate = Order::whereDate('created_at', '<', $today)
            ->orderByDesc('created_at')
            ->value(DB::raw('DATE(created_at)'));

        $todayValue = $callback($today);

        $lastValue = $lastDate
            ? $callback($lastDate)
            : 0;

        $percent = $lastValue > 0
            ? (($todayValue - $lastValue) / $lastValue) * 100
            : 0;

        return response()->json([
            'value' => $todayValue,
            'percent' => round($percent, 2),
            'previous_date' => $lastDate,
        ]);
    }

    public function revenue()
    {
        return $this->compareWithPrevious(function ($date) {
            return Order::whereDate('created_at', $date)
                ->sum('grand_total');
        });
    }

    public function transactions()
    {
        return $this->compareWithPrevious(function ($date) {
            return Order::whereDate('created_at', $date)
                ->count();
        });
    }
    public function itemsSold()
    {
        return $this->compareWithPrevious(function ($date) {
            return OrderItem::whereDate('created_at', $date)
                ->sum('qty');
        });
    }
    public function averageSales()
    {
        return $this->compareWithPrevious(function ($date) {
            return Order::whereDate('created_at', $date)
                ->avg('grand_total',0);
        });
    }


    public function chart()
    {
        $startDate = Carbon::today()->subDays(6);

        $sales = Order::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('SUM(grand_total) as revenue'),
            DB::raw('COUNT(*) as transactions')
        )
            ->whereDate('created_at', '>=', $startDate)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $result = [];

        for ($date = $startDate->copy(); $date->lte(Carbon::today()); $date->addDay()) {
            $day = $date->toDateString();

            $result[] = [
                'date' => $day,
                'label' => $date->format('d M'),
                'revenue' => $sales[$day]->revenue ?? 0,
            ];
        }

        return response()->json($result);
    }
}
