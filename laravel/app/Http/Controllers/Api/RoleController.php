<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\MainController;
use App\Models\Permission;
use App\Models\PermissionRole;
use App\Models\PermissionUser;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class RoleController extends Controller
{
       public function roleIndex() {
        $data = Role::get();
        

        return response()->json([
            "data" => $data,
        ], 200);
    }


    public function UserRoles(Request $request) {
        
        $data = PermissionUser::create([
            'user_id'=> $request->user_id,
            'permission_id'=>$request->permission_id,
            'user_type'=>$request->user_type,
        ]);
        

        return response()->json([
            "data" => $data,
        ], 200);
    }

    public function permissionsIndex() {
        $data = Permission::get();

        return response()->json([
            "data" => $data,
        ], 200);       }
    public function roles_create(Request $request) {
       
        $data = Role::create([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' =>$request->description 
        ]);
        
        return response()->json([
            "data" => $data,
        ], 200);    
    }

    public function permissions_create(Request $request) {
        $permission = Permission::create([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description
        ]);

        PermissionRole::create([
            'role_id'=> $request->role_id,
            'permission_id' => $permission->id
        ]);
        
        return response()->json([
            "data"=>$permission
        ], 200); 
            
        }

}
