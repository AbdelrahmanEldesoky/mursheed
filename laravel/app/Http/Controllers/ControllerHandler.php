<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Child\Entities\Child;
use mysql_xdevapi\Collection;

/**
 * controller handel templete by model
 */
class ControllerHandler
{
    private $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function getAll($key)
    {

        $model = $this->model::all();
        if (\request()->query('mobile') && property_exists($this->model, 'translatable'))

            foreach ($this->model->translatable as $translatble)
                $model->setTranslations($translatble, [app()->getLocale()]);

        return response([
            "$key" => $model,
            "message" => "success",
            "status" => true
        ], 200);
    }

    public function getAllWith($key, $with)
    {
        $model = $this->model::with($with)->get();
        $k = array_search('media', $with, true);
        if ($k !== false) {
            $model = $this->model::with($with)->get()->map(function ($data) {
                $collect = collect(collect($data)['media'])->groupBy('collection_name')->toArray();

                $data['pictures'] = count($collect) ? $collect : null;
                return $data;
            });
        }


        return response([
            "$key" => $model,
            "message" => "success",
            "status" => true
        ], 200);
    }

    public function getWhere($key, $coulmn, $value, $limit = null)
    {
        return response([
            "$key" => $this->model::where($coulmn, $value)->latest('id')->limit($limit)->get(),
            "message" => "success",
            "status" => true
        ], 200);
    }
    public function getAllwithOrderBy($key,$with,$coulmn, $value)
    {
        $model = $this->model::with($with)->orderBy($coulmn,$value)->get();
        $k = array_search('media', $with, true);
        if ($k !== false) {
            $model = $this->model::with($with)->get()->map(function ($data) {
                $collect = collect(collect($data)['media'])->groupBy('collection_name')->toArray();

                $data['pictures'] = count($collect) ? $collect : null;
                return $data;
            });
        }


        return response([
            "$key" => $model,
            "message" => "success",
            "status" => true
        ], 200);
    }

    public function store($key, $data)
    {
        return response([
            "$key" => $this->model::create($data),
            "message" => "success stored " . $key,
            "status" => true
        ], 200);
    }

    public function storeWithMediaAndLanguages($key, $data, $collectionNames, $languages)
    {
        $model = $this->model::create($data);
        foreach ($collectionNames as $collectionName)
            $model->addMultipleMediaFromRequest([$collectionName])->each(function ($fileAdder) use ($collectionName) {
                $fileAdder->toMediaCollection($collectionName);
            });
        foreach ($languages as $lang) {
            $model->languagesable()->create(
                [
                    'language_id' => $lang

                ]
            );
        }

        return response([
            "$key" => $model,
            "message" => "success stored " . $key,
            "status" => true
        ], 200);
    }

    public function updateWithMediaAndLanguages($key, $data, $collectionNames, $languages, $model)
    {
        $model->update($data);
        foreach ($collectionNames as $collectionName)
            $model->addMultipleMediaFromRequest([$collectionName])->each(function ($fileAdder) use ($collectionName) {
                $fileAdder->toMediaCollection($collectionName);
            });
        foreach ($languages as $lang) {
            $model->languagesable()->create(
                [
                    'language_id' => $lang

                ]
            );
        }

        return response([
            "$key" => $model,
            "message" => "success stored " . $key,
            "status" => true
        ], 200);
    }

    public function show($key, $model)
    {
        return response([
            "$key" => $model,
            "message" => "success",
            "status" => true
        ], 200);
    }

    public function showWith($key, $model, $with)
    {
        $model = $this->model::with($with)->get();
        $k = array_search('media', $with, true);
        if ($k !== false) {
            $model = $this->model::with($with)->get()->map(function ($data) {
                $collect = collect(collect($data)['media'])->groupBy('collection_name')->toArray();

                $data['pictures'] = count($collect) ? $collect : null;
                return $data;
            });
        }


        return response([
            "$key" => $model,
            "message" => "success",
            "status" => true
        ], 200);
    }

    public function update($key, $model, $data)
    {

        return response([
            "updated" => $model->update($data),
            "$key" => $model,
            "message" => "success",
            "status" => true
        ], 200);
    }

    public function destory($key, $model)
    {
        return response([
            "deleted" => $model->delete(),
            "$key" => $this->model::all(),
            "status" => true
        ], 200);
    }
}