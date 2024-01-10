<?php

namespace App\Models;

use App;
use App\Traits\Lang;
use App\Traits\IsDefault;
use App\Traits\Active;
use App\Traits\Sorted;
use App\Traits\CountryStateCity;
use App\Helpers\MiscHelper;
use App\Helpers\DataArrayHelper;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{



    protected $table = 'cities';
    public $timestamps = true;
    protected $guarded = ['id'];
    //protected $dateFormat = 'U';
    protected $dates = ['created_at', 'updated_at'];

    public function getCountry($field)
    {
        if (null !== $state = $this->getState()) {
            return $state->getCountry('country');
        }
    }

    public static function getCityById($id)
    {
        $city = self::where('cities.city_id', '=', $id)->lang()->active()->first();

        if (null === $city) {
            $city = self::where('cities.city_id', '=', $id)->active()->first();
        }

        return $city;
    }
    public function scopeLang($query)
    {

        return $query->where('lang', 'like',\App::getLocale()=='sa'?'ar':'en' );
    }

}
