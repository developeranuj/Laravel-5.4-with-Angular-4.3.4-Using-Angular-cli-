<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Contracts\Auth\Guard;
use JWTAuth;
use Auth;
class IsAdmin
{
   protected $auth;

  public function __construct(Guard $auth)
  {
   //   $this->auth = $auth;
  }
   /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Closure  $next
    * @return mixed
    */

   public function handle(Request $request, Closure $next)
   {
       
       JWTAuth::parseToken();
       $user = JWTAuth::parseToken()->authenticate();

       foreach ($user->usermeta as $key => $role) {
         if($role->role == 1){
           return $next($request);
         }
         else{
            return response()->json(['status' => false, 'message' =>' $user->usermeta'], 200);
         }
       }
        

       
     /*foreach (Auth::user()->usermeta as $key => $role) {
         if($role->role == 2){
           return $next($request);
         }
         else{
            return response()->json(['status' => false, 'message' => $user->usermeta], 200);
         }
         }*/
     
           
   }
          

}