<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Closure;
use App\User;
use Mail;
use App\Forgotpassword;
use Cookie;
use App\Usermeta;
//4-11-2017
use Illuminate\Support\Facades\Hash;

class ApiAuthController extends Controller
{

 //Authentication Process

 public function authenticate(){
  $credentials = request()->only('email', 'password');

  try{

    $token = JWTAuth::attempt($credentials);

    if(!$token){
      return response()->json(['status' => false,'error' => 'invalid credentials'], 200);
    }

  }

   catch(JWTException $e){

       return response()->json(['status' => false,'error' => 'Something Went Wrong'], 200);
   }

      $user=User::with('usermeta')
                  ->where('email','=',  request()->only('email'))
                  ->first();
      return response()->json(['status' => true,'token' => 'bearer ' . $token, 'userdata'=>$user], 200);
 }



 // Forgot PassWord


  public function ForgotPassword(Request $request){

      $user=User::where('email','=', $request->email)->first();
      if(count($user) == 0){

        return response()->json(["message" => "Email is not registered"]);

      }else{

        $this->sendEmail($user);
        return response()->json(["status" => true, "message" => "We send you a password reset link"]);
      }

  }

// Send Mail with token

  public function sendEmail($user){

     $string = "abcdefghijklmnopqrstuvwxyz".time();
     $code= str_shuffle($string);
     $deletebefore = Forgotpassword::where('email', '=', $user->email)->delete();
     $forgotpassword = new Forgotpassword();
     $forgotpassword->fill(['email' => $user->email, 'token' => $code]);
     $forgotpassword->save();

     Mail::send('mail',[
        'user'=>$user,
        'code'=>$code],
        function ($message) use ($user){
           $message->to($user->email);
           $message->subject("hello $user->name, reset your password");
     });

  }

   //Check user token

  public function ResetPassword(request $request){
        $string = "abcdefghijklmnopqrstuvwxyz".time();
          $password= str_shuffle($string);

          $hashedpassword = Hash::make($password);

          $user = User::where('email', '=', $request->email)->first();
          Mail::send('registrationmail',[
                'username'=>$user->name,
                'password'=>$password],
                function ($message) use ($user){
                   $message->to($user->email);
                   $message->subject("hello $user->name, Temporary password");
             });

          $update = $user->update(['password' => $hashedpassword]);

          if($update){
           return response()->json(['status' => true, 'message'=> 'Password sent successfully.'], 200);
          }
          else{
           return response()->json(['status' => false, 'message'=> 'Problem while updating password.'], 200);
          }

        $token = str_replace('bearer ', '', $request->headers->get('Authorization'));

        $admin = JWTAuth::toUser($token);

        if(!empty($admin)){


        }

        // $forgotpassword = Forgotpassword::where('token', '=', $token)->first();

        // if($forgotpassword->token == $token){
        //   return redirect('/form/changePassword/'.$token);
        // }else{
        //   return response()->json(["status" => false, "message" => "Your Token Has been Expired"]);
        // }
  }


    public function ChangePassword(request $request){

       $resetpassword=Forgotpassword::where('token','=', $request->token)->first();
       $user=User::where('email','=', $resetpassword->email)->first();
       $user->password =  Hash::make($request->password);
       $update = $user->save();

       if($update){
         return response()->json(["status" => true, "message" => "Password has been successfully Changed"]);
       }else{
        return response()->json(["status" => false, "message" => "Your Link Has been Expired"]);
       }

   }

   public function actAsSales(request $request){

       //return $request->email;

       $user = JWTAuth::toUser($request->token);

      //return $user;

       if(!empty($user)){
          $user=User::with('usermeta')
                  ->where('email','=',  request()->only('email'))
                  ->first();
      return response()->json(['status' => true, 'userdata'=>$user], 200);
       }
       else{
          return response()->json(["status" => false, "message" => "Something went wrong"]);
       }
   }


   public function logout(Request $request){



     if(JWTAuth::parseToken()->invalidate()){
        return response()->json(["status" => true, "message" => "User successfully logout"]);
     }
     else{
        return response()->json(["status" => false, "message" => "Something went wrong"]);
     }

   }

   public function TokenVerify(Request $request){

            JWTAuth::parseToken();

        // and you can continue to chain methods
        $user = JWTAuth::parseToken()->authenticate();

        $user_id = $user->id;

        $userdata = User::with('usermeta')
                              ->where('id', '=', $user_id)
                              ->first();

        return response()->json(["status" => true, "message" => "Verified user", 'userdata'=>$userdata]);
   }



}
