<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttractiveUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
//    public function withValidator($validator)
//    {
//        $validator->after(function ($validator) {
//            $validator->errors()->add('status', false);
//
//        });
//    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string",
            "country_id" => "required|int",
            "city_id" => "required|int",
            "description" => "required|string",
            "lat" => "required|string",
            "long" => "required|string",

        ];
    }
}
