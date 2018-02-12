<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use App\User;
use App\Usermeta;
use Mail;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

//Registration Process 

 public function registration(request $request){


        $newusers = new User();

        if (User::where('email', '=', $request->email)->exists()) {
          return response()->json(['status' => false, 'message'=> 'Email already exists'], 200);
        }
        else{
            $string = "abcdefghijklmnopqrstuvwxyz".time();
            $password= str_shuffle($string);

            $hashedpassword = Hash::make($password);
            $username = $request->name;
            Mail::send('registrationmail',[
                'username'=>$username,
                'password'=>$password], 
                function ($message) use ($request){
                   $message->to($request->email);
                   $message->subject("hello $request->name, Temporary password");
             });

            
            $newusers->fill([
                'name' => $request->name,
                'email'=> $request->email,
                'password'=> $hashedpassword,
                'contact'=> $request->contact,
                'mobile'=> $request->mobile,
                'password_status'=> false
            ]);
           
            $newusers->save();
       
            $userrole = new usermeta();
            $userrole->role = $request->role;
            $newusers->usermeta()->save($userrole);
            return response()->json(['status' => true,'message' => 'User created successfully.'], 200);
        }
    }


    public function GetUsers(request $request){

        $newusers = User::with('usermeta')->get();
        return response()->json(['status' => true, 'users'=> $newusers], 200);
       
    }

    public function UpdateUser(request $request){
        
        $newusers = User::where('id', '=', $request->id);
        $update = $newusers->update(['name' => $request->name,'contact' => $request->contact,'mobile' => $request->mobile,'email' =>$request->email]);

        if($update){
           return response()->json(['status' => true, 'message'=> 'User updated successfully.'], 200);  
        }else{
           return response()->json(['status' => false, 'message'=> 'User not updated.'], 200);
        } 

    }

    public function DeleteUser(request $request){

        //return $request->id;

        $newusers = User::where('id', '=', $request->id)->delete();

        if($newusers){

           return response()->json(['status' => true, 'message'=> 'User deleted successfully'], 200);
        }else{

           return response()->json(['status' => false, 'message'=> 'User not deleted'], 200);   
        } 
       
    }

    public function ChangeUserPassword(request $request){

        $newusers = User::where('id', '=', $request->id)->first();
        
        $oldpassword = $newusers->password;

        if (Hash::check($request->oldpassword, $oldpassword)){

            $newusers->password = Hash::make($request->newpassword);
            $newusers->password_status = true;
            
            $newusers->save();

            return response()->json(['status' => true, 'message'=> 'Password Successfully Changed'], 200);    

        }else{

        return response()->json(['status' => false, 'message'=> 'Old password is incorrect.'], 200);

        } 
       
    }

    public function GetSingleUser($id){
       
       $user = User::where('id', '=', $id)->first();

       return response()->json(['status' => true, 'userdata'=> $user], 200);
   }

    
}
