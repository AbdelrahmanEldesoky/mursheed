<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $beamsClient;

    public function __construct()
    {
        $this->beamsClient = new \Pusher\PushNotifications\PushNotifications(array(
            "instanceId" => "140343aa-f173-4a2d-940a-7724c7c12be1",
            "secretKey" => "7D70A732FDB61A5566B7DAD488F4FAFAD39120B6B172A8A91A9A605F4B3653D5",
        ));
    }

//    public function registerUsersToPusher(Request $request)
//    {
//        $userID = $request->user()->id; // If you use a different auth system, do your checks here
//
//        $beamsToken = $this->beamsClient->generateToken(strval($userID));
//        return response()->json($beamsToken);
//    }


    public function sendNotification(Request $request)
    {
        $publishResponse = $this->beamsClient->publishToUsers(
            array("$request->id"),
            array(
                "fcm" => array(
                    "notification" => array(
                        "title" => $request->title,
                        "body" => $request->body
                    )
                ),
                "apns" => array("aps" => array(
                    "alert" => array(
                        "title" => $request->title,
                        "body" => $request->body
                    )
                )),
                "web" => array(
                    "notification" => array(
                        "title" => $request->title,
                        "body" => $request->body
                    )
                )
            )
        );
        return response()->json($publishResponse);
    }

    /**
     * @param $ids @array of strings
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function sendNotificationToMobile($ids , $title , $body)
    {
        $publishResponse = $this->beamsClient->publishToUsers(
            $ids,
            array(
                "fcm" => array(
                    "notification" => array(
                        "title" => $title,
                        "body" => $body
                    )
                ),
                "apns" => array("aps" => array(
                    "alert" => array(
                        "title" => $title,
                        "body" => $body
                    )
                )),
                "web" => array(
                    "notification" => array(
                        "title" => $title,
                        "body" => $body
                    )
                )
            )
        );
        return response()->json($publishResponse);
    }



}
