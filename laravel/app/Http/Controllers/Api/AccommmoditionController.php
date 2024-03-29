<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerHandler;
use App\Http\Controllers\Filter\SearchByAccomoditionCategory;
use App\Http\Controllers\Filter\SearchByAccomoditionRooms;
use App\Http\Requests\AccommoditionRequest;
use App\Models\accommmodition;
use Illuminate\Support\Facades\Pipeline;
use Illuminate\Http\Request;

class AccommmoditionController extends Controller
{
    private $ControllerHandler;
    private $accommmodition;

    public function __construct()
    {

        $this->accommmodition = new accommmodition();
        $this->ControllerHandler = new ControllerHandler($this->accommmodition);
    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $model = Pipeline::send($this->accommmodition::query())->through(
            [
              //  SearchByAccomoditionCategory::class,
               // SearchByAccomoditionRooms::class
            ]
        )->then(
            fn($user) => $user->with(['media', 'country', 'state'])->get()
        );
        $k = array_search('media', ['media', 'country', 'state'], true);
        if ($k !== false) {
            $model = $this->accommmodition::
                when($request->has('rooms'),fn($query)=>$query->where('rooms',$request->rooms))
                ->when($request->has('category_id'),fn($query)=>$query->where('category_accommodations_id',$request->category_id))
                ->with(['media', 'country', 'state'])->get()->map(function ($data) {
                $collect = collect(collect($data)['media'])->groupBy('collection_name')->toArray();

                $data['pictures'] = count($collect) ? $collect : null;
                return $data;
            });
        }


        return response([
            "accommmoditions" => $model,
            "message" => "success",
            "status" => true
        ], 200);
        return $this->ControllerHandler->getAllWith("accommmoditions", ['media', 'country', 'state']);
    }

    /**
     * @param Child $child
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show(accommmodition $accommmodition)
    {
        return $this->ControllerHandler->showWith("accommmodition", $accommmodition, ['media', 'country', 'state']);
    }

    /**
     * @param ChildRequest $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(AccommoditionRequest $request)
    {
        //        return response(['k'=>$request->images]);

        //            $created->addMultipleMediaFromRequest(['images'])->each(function ($fileAdder) {
        //            }
        //            $fileAdder->toMediaCollection('photos');
        //        });

        return $this->ControllerHandler->store("accommmodition", array_merge($request->validated(), [
            "aval_status" => $request->aval_status ? 1 : 0,
            "info_status" => $request->info_status ? 1 : 0
        ]));
    }

    /**
     * @param ChildRequest $request
     * @param Child $child
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */

    public function update(AccommoditionRequest $request, accommmodition $accommmodition)
    {

        // here some validation check parent or admin
        if (request()->images) {
            $accommmodition->clearMediaCollection('photos');
            //
            $accommmodition->addMultipleMediaFromRequest(['images'])->each(function ($fileAdder) {
                $fileAdder->toMediaCollection('photos');
            });
        }

        return $this->ControllerHandler->update("accommmodition", $accommmodition, array_merge($request->validated(), [
            "aval_status" => $request->aval_status ? 1 : 0,
            "info_status" => $request->info_status ? 1 : 0
        ]));
    }


    public function destroy(accommmodition $accommmodition)
    {
        // here some validation check parent or admin


        return $this->ControllerHandler->destory("accommmodition", $accommmodition);
    }
}