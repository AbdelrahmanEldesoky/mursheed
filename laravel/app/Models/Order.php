<?php

namespace App\Models;

use App\Enums\OrderStatus;
use App\Http\Controllers\MobileAPi\OrderController;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    use HasFactory;

    protected $guarded = array();


    protected $casts = [
        'status' => OrderStatus::class
    ];


    protected $appends = [
        'vendor', 'tourist_name','rating'
    ];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetails::class);
    }

    public function delete()
    {
        DB::transaction(function () {
            if ($this->orderDetails)
                $this->orderDetails()->delete();

            parent::delete();
        });
    }

    public function user()
    {
        return $this->morphTo();
    }


    public function tourist()
    {
        return $this->belongsTo(Tourist::class);
    }

    public function getVendorAttribute()
    {

        $name = $this->user()->pluck('name')[0];
        return $name;
    }

    public function getRatingAttribute()
    {

        $name = $this->user()->pluck('total_rating')[0];
        return (int)$name;
    }

    public function getTouristNameAttribute()
    {
        return $this->tourist()->pluck('name')[0];
    }

//
//    public function getUserTypeAttribute()
//    {
//        return explode("\\", get_class($this->user_type))[2];
//    }
    protected function userType(): Attribute
    {
        return Attribute::make(
            get: fn ( $value) => explode("\\", get_class($this->user))[2],
        );
    }
}
