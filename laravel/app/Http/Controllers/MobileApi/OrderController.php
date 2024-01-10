<?php

namespace App\Http\Controllers\MobileApi;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Http\Controllers\MobileApi\Repository\OrderRepository;
use App\Http\Controllers\MobileApi\Services\OrderServices;
use App\Http\Controllers\NotificationController;
use App\Models\CountryPrice;
use App\Models\Driver;
use App\Models\Guides;
use App\Models\MursheedUser;
use App\Models\Order;
use App\Models\Tourist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Geocoder\Geocoder;
use \KMLaravel\GeographicalCalculator\Facade\GeoFacade;
use function Laravel\Prompts\select;

class OrderController extends Controller
{
    public $geocoder;

    public function __construct()
    {
//
//        $client = new \GuzzleHttp\Client();
//        $this->geocoder = new Geocoder($client);
//
//        $this->geocoder->setApiKey(config('geocoder.key'));


    }

    public function store(Request $request)
    {
        if (!CountryPrice::where('country_id', $request->order['country_id'])->first())
            return response(['message' => "country_id should enter by admin", 'status' => false], 404);

        $model = Driver::find($request->user_id);
        if ($request->user_type == 2) {
            $model = Guides::find($request->user_id);
        }

        if ($model) {
            return (new OrderServices($request->order['country_id'], $model))
                ->calculateRoutingForCities($request->order_details)
                ->storeOrderWithDetailsForUser($request->order, $model);

        }
        return response(['message' => "model not found", 'status' => false], 404);

    }

    public function getPrice(Request $request)
    {
        if (!CountryPrice::where('country_id', $request->order['country_id'])->first())
            return response(['message' => "country_id should enter by admin", 'status' => false], 404);

        $model = Driver::find($request->user_id);
        if ($request->user_type == 2) {
            $model = Guides::find($request->user_id);
        }

        if ($model) {
            return (new OrderServices($request->order['country_id'], $model))
                ->calculateRoutingForCities($request->order_details)
                ->returnResponseForCities();
        }
        return response(['message' => "model not found", 'status' => false], 404);

    }


    public function index()
    {
        $orders = Order::all();


        return response(['orders' => $orders]);
    }

    public function show(Order $order)
    {
        return response(['order' => $order->orderDetails()->get(), 'country_price' => CountryPrice::find($order->country_id),
            'total_cost' => $order->cost, 'start_date' => $order->start_date, 'end_date' => $order->end_date]);
    }

    public function submitOrder(Order $order)
    {
        $order->update(['status' => OrderStatus::pending]);
        return response(['message' => "order created successfully", "status" => true]);
    }

    public function statusOrder(Request $request, Order $order)
    {
        $order->update(['status' => $request->status]);
        if ($request->status == OrderStatus::pending)
            (new NotificationController())->sendNotificationToMobile([strval(MursheedUser::where('user_id',$order->user->id)->get()->first()->id),strval(MursheedUser::where('email','admin@admin.com')->first()->id)], "Mursheed Order", "your order has been " . OrderStatus::fromName($request->status));

        elseif ($request->status == OrderStatus::approved)
            (new NotificationController())->sendNotificationToMobile([strval(Tourist::whereId($order->tourist_id)->get()->first()->mursheed_user->id),strval(MursheedUser::where('email','admin@admin.com')->first()->id)], "Mursheed Order", "your order has been " . OrderStatus::fromName($request->status));
        elseif($request->status == OrderStatus::canceled)
            (new NotificationController())->sendNotificationToMobile([strval(Tourist::whereId($order->tourist_id)->get()->first()->mursheed_user->id),strval(MursheedUser::where('email','admin@admin.com')->first()->id)], "Mursheed Order", "your order has been " . OrderStatus::fromName($request->status));
        elseif ($request->status == OrderStatus::canceled)
            (new NotificationController())->sendNotificationToMobile([strval(MursheedUser::where('user_id',$order->user->id)->get()->first()->id),strval(MursheedUser::where('email','admin@admin.com')->first()->id)], "Mursheed Order", "your order has been " . OrderStatus::fromName($request->status));



        return response(['message' => "order status updated ", "status" => true]);
    }

    public function getMyOrders()
    {
        if (class_basename(auth()->user()->user_type) != "Tourist")
            return response(['myOrders' => Order::with('orderDetails')
                ->when(request('status') == 'open', function ($query) {
                    return $query->where('status', '!=', OrderStatus::canceled)->where('status', '!=', OrderStatus::paid)->where('status', '!=', OrderStatus::expired)->where('status', '!=', OrderStatus::approved);
                })
                ->when(request('status') == 'close', function ($query) {
                    return $query->where('status', OrderStatus::canceled)->where('status', OrderStatus::paid)->where('status', OrderStatus::expired)->where('status', OrderStatus::approved);
                })
                ->where('user_id', auth()->user()->user->id)->where('user_type', auth()->user()->user_type)->get(), "status" => true]);
        else
            return response(['myOrders' => Order::with('orderDetails')
                ->when(request('status') == 'open', function ($query) {
                    return $query->where('status', '!=', OrderStatus::canceled)->where('status', '!=', OrderStatus::paid)->where('status', '!=', OrderStatus::expired)->where('status', '!=', OrderStatus::approved);
                })
                ->when(request('status') == 'close', function ($query) {
                    return $query->where('status', OrderStatus::canceled)->where('status', OrderStatus::paid)->where('status', OrderStatus::expired)->where('status', OrderStatus::approved);
                })->where('tourist_id', auth()->user()->user->id)->get(), "status" => true]);
    }
}
