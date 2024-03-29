<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerHandler;
use App\Http\Controllers\Filter\SearchByCountry;
use App\Http\Controllers\Filter\SearchByLanguage;
use App\Http\Controllers\Filter\SearchByName;
use App\Http\Controllers\Filter\SearchByPrice;
use App\Http\Controllers\Filter\SearchByState;
use App\Http\Requests\Guide\UpdateProfileRequest;
use App\Http\Requests\GuideRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Guides;
use App\Models\MursheedUser;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Notifications\SendEmailForApprove;
use Illuminate\Support\Facades\Pipeline;
use Ramsey\Uuid\Guid\Guid;

class GuidesCotroller extends Controller
{
    private $ControllerHandler;

    public function __construct()
    {
        $this->ControllerHandler = new ControllerHandler(new Guides());
    }

    public function index()
    {
        return $this->ControllerHandler->getAllWith("guides", ['media']);
    }

    public function index_mobile(Request $request)
    {
        $guides = Pipeline::send(Guides::query()

            ->when($request->has('price'),fn($query)=>$query->whereHas('priceServices',fn($query)=>$query->where('price','<=',$request->price)))
            ->when($request->has('language_id'),fn($query)=>$query->whereHas('languagesable',fn($query)=>$query->whereIn('language_id',$request->language_id)))
            ->when($request->has('name'),fn($query)=>$query->where('name','LIKE',"%{$request->name}%"))
            ->when($request->has('country_id'),fn($query)=>$query->where('country_id',$request->country_id))
            ->when($request->has('state_id'),fn($query)=>$query->where('state_id',$request->state_id))
            )
            ->through([

//                SearchByName::class,
//                SearchByCountry::class,
//                SearchByState::class,
            ])
            ->then(fn ($user) => $user
                ->select('id', 'name', 'state_id','total_rating')
                ->withCount(['favourites' =>function($q){
                    $q->where('tourist_id','=',auth()->user()->user_id);
                 }])
                ->addSelect(['state_name' => State::select('state')->whereColumn('states.id', 'guides.state_id')])
                ->orderBy('ratings_sum','DESC')
                ->limit(4)->get()
                ->each(function ($guide) {
                    $guide->personal_photo =
                        count($guide->getMedia('personal_photo')) == 0
                            ? url("default_user.jpg") : $guide->getMedia('personal_photo')->first()->getUrl();

                    $guide->image_background = url("guide_default.jpg");
                    unset($guide->media);

                    $guide->is_favourite = $guide->favourites()->where('tourist_id',auth()->user()->id)->where('service_type','App\Models\Guides')->count() > 0 ;
                    unset($guide->favourites_count);
                }));


        return response()->json([
            "success" => true,
            "message" => "latest guides in state",
            "guides" => $guides,
        ], 200);
    }

    public function show(Guides $guide)
    {
        // return $this->ControllerHandler->showWith("guide", $guide, ['media']);

        $car_photos = [];
        $guide->load(['country', 'state','priceServices']);

        if (count($guide->getMedia('car_photo')) >= 0) {
            foreach ($guide->getMedia('car_photo') as $media) {
                $car_photos[] = $media->getUrl();
            }
        }

        return response()->json([
            "success" => true,
            "message" => "guide details",
            "user" => [
                "id" => $guide->id,
                "name" => $guide->name,
                "country" => $guide->country->country,
                "state" => $guide->state->state,
                "lang" => [],
                "bio" => $guide->bio,
                "personal_photo" => empty($guide->getFirstMediaUrl('personal_pictures')) ? url("default_user.jpg") : $guide->getFirstMediaUrl('personal_pictures'),
                "total_rate"=>$guide->total_rating,
                "count_rate"=>$guide->ratings_count,
            ],
        ], 200);
    }

    public function store(GuideRequest $request)
    {
        // return $this->ControllerHandler->storeWithMediaAndLanguages(
        //     "guide",
        //     array_merge(
        //         $request->except('personal_pictures', 'languages'),
        //         $request->password ? ['password' => Hash::make($request->password), 'status' => -1] : ['status' => -1]
        //     ),
        //     ['personal_pictures'],
        //     $request->languages
        // );

        $data = $request->validated();
        $data['password'] = Hash::make($request->validated('password'));
        $data['status'] = -1;

        $guide = Guides::create($data);
        $global_user = MursheedUser::where("email", $guide->email)->first();

        return response()->json([
            'status' => true,
            'message' => 'tourist successfully created',
            'token' => $global_user->createToken("API TOKEN")->plainTextToken,
            "user" => [
                "id" => $guide->id,
                "notification_id" => $guide->mursheed_user->id,

                "name" => $guide->name,
                "phone" => $guide->phone,
                "email" => $guide->email,
                "is_verified" => $guide->email_verified_at ? true : false,
                "type" =>  "Guides",
                "nationality" => $guide->nationality,
                "country_id" => (int)$guide->country_id,
                "state_id" => (int)$guide->state_id,
                "gender" => $guide->gender ? ($guide->gender == 1 ? "male" : "female") : null,
                "personal_photo" => empty($guide->getFirstMediaUrl('personal_pictures')) ? null : $guide->getFirstMediaUrl('personal_pictures'),
            ],
        ], 201);
    }

    public function update_mobile(UpdateProfileRequest $request)
    {

        $guide = Guides::where('email', $request->user()->email)->first();

        if ($guide == null) {
            return response()->json(["message" => "unauthenticated"], 401);
        }

        $global_user = $request->user();
        $global_user->update([
            'email' => $request->email ? $request->email : $global_user->email,
            'password' => $request->password ? Hash::make($request->password) : $global_user->password
        ]);

        if ($request->personal_pictures) {
            $guide->clearMediaCollection('personal_pictures');
            $guide->addMultipleMediaFromRequest(['personal_pictures'])->each(function ($fileAdder) {
                $fileAdder->toMediaCollection('personal_pictures');
            });
        }

        $data = $request->except('personal_pictures', 'languages', 'car_photos');

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $guide->update($data);

        return response([
            "status" => true,
            "message" => "updated successfully",
            "user" => [
                $guide->fresh(),
            ],
        ], 200);
    }

    public function update(GuideRequest $request, Guides $guide)
    {

        $global_user = MursheedUser::where('email', $guide->email)->first();
        $global_user->update([
            'email' => $request->email ? $request->email : $global_user->email,
            'password' => $request->password ? Hash::make($request->password) : $global_user->password
        ]);

        if ($request->personal_pictures) {
            $guide->clearMediaCollection('personal_pictures');
            $guide->addMultipleMediaFromRequest(['personal_pictures'])->each(function ($fileAdder) {
                $fileAdder->toMediaCollection('personal_pictures');
            });
        }

        return $this->ControllerHandler->update(
            "guide",
            $guide,
            array_merge(
                $request->except('personal_pictures', 'languages'),
                $request->password ? ['password' => Hash::make($request->password)] : []
            )
        );
    }

    public function destroy(Guides $guide)
    {
        return $this->ControllerHandler->destory("guide", $guide);
    }

    public function active(Guides $guide)
    {
        $guide->notify(new SendEmailForApprove());
        return $this->ControllerHandler->update("guide", $guide, ['status' => 1]);
    }

    public function inActive(Guides $guide)
    {

        $this->ControllerHandler->update("guide", $guide, ['status' => 0]);
        return  $guide->notify(new SendEmailForApprove());
    }

    public function change(Guides $guide)
    {


        $this->ControllerHandler->update("guide", $guide, ['status' => $guide->status ^ 1]);
        return $guide->notify(new SendEmailForApprove());
    }

    public function getLatestWithCity(Request $request)
    {
        // return $this->ControllerHandler->getWhere("guides", 'state_id', $state_id, 4);

        $guides = Guides::query()
            ->select('id', 'name', 'state_id','total_rating')
            ->addSelect(['state_name' => State::select('state')->whereColumn('states.id', 'guides.state_id')])
            ->where(function ($query) use ($request) {
                if( $request->state_id!= null && $request->state_id!= 0 && $request->state_id!= false ){
                    $query->where('state_id', $request->state_id);
                }
            })
            ->orderBy('ratings_sum','DESC')
            ->limit(4)
            ->get()
            ->each(function ($guide) {
                $guide->personal_photo =
                    count($guide->getMedia('personal_photo')) == 0
                    ? url("default_user.jpg") : $guide->getMedia('personal_photo')->first()->getUrl();
                $guide->is_favourite = $guide->favourites()->where('tourist_id',auth()->user()->id)->where('service_type','App\Models\Guides')->count() > 0 ;

                $guide->image_background = url("guide_default.jpg");
                unset($guide->media);
            });

        return response()->json([
            "success" => true,
            "message" => "latest guides in state",
            "guides" => $guides,
        ], 200);
    }

    public function getGuideByCityWithPriceList(Request $request)
    {
            return response([
               "guides"=>Guides::whereHas('priceServices',function ($query) use ($request){
                   $query->where('city_id',$request->city_id);
               })->with('priceServices')->get()->append('state_name')->each(function ($driver) {
                   $driver->personal_photo =
                       count($driver->getMedia('personal_photo')) == 0
                           ? url("default_user.jpg") : $driver->getMedia('personal_photo')->first()->getUrl();

                   $driver->image_background =
                       count($driver->getMedia('car_photo')) == 0
                           ? url("car_photo_default.jpg") : $driver->getMedia('car_photo')->first()->getUrl();

                   unset($driver->media);
               }),
                "status"=>true

            ]);

    }
}
