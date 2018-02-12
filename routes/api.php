<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/user', function(){

    $token = JWTAuth::getToken();

    $user = JWTAuth::toUser($token);
    return $user;

})->middleware('jwt.auth');


//User Authentication Route Group

Route::group(['name'=>'authenticate'], function () {

// User Authentication

Route::post('/authenticate', 'ApiAuthController@authenticate');

// Forgot Password Route

Route::post('/forgotpassword', 'ApiAuthController@ForgotPassword');

// Reset Password Route

Route::post('/resetpassword','ApiAuthController@ResetPassword')->middleware('jwt.auth', 'admin');

// Change Password Route

Route::post('/changepassword','ApiAuthController@ChangePassword');

// Act As Sales Route

Route::post('/actassales','ApiAuthController@actAsSales')->middleware('jwt.auth');

// User Logout Route

Route::post('/logout','ApiAuthController@logout');

// VerifyToken

Route::post('/verifytoken', 'ApiAuthController@TokenVerify')->middleware('jwt.auth');



});


//Admin Route Group

Route::group(['name'=>'Admin'], function () {

// User Registration Route

Route::post('/register','UserController@registration');

// Get All Users Route

Route::get('/getusers','UserController@GetUsers');

// Update Users Route

Route::post('/updateuser','UserController@UpdateUser');

// get single Users Route

Route::get('/getsingleuser/{id}','UserController@GetSingleUser');

// Delete Users Route

Route::post('/deleteuser','UserController@DeleteUser');

// Change User Password Route

Route::post('/changeuserpassword','UserController@ChangeUserPassword');

// Client Image Uploads

Route::post('/builderimage','ClientPartnership@BuilderImageUploads');


// Client Registration Route

Route::post('/createclients','ClientsController@CreateClients');

// Update Client

Route::post('/updateclient','ClientsController@UpdateClient');

// Get Clients

Route::get('/getclients','ClientsController@GetClients');

// Get Single Clients

Route::get('/getsingleclient/{id}','ClientsController@GetSingleClient');

// Get Single Clients

Route::get('/deletesingleclient/{id}','ClientsController@DeleteSingleClient');


// Create Partnership

Route::post('/createpartnership','ClientPartnership@CreatePartnership');

// Update Partnership

Route::post('/updatepartnership','ClientPartnership@UpdatePartnership');

// Get Partnerships

Route::get('/getpartnership','ClientPartnership@GetPartnerships');

// Get Single Partnerships

Route::get('/getsinglepartnership/{id}','ClientPartnership@GetSinglePartnerships');

// Delete Partnership

Route::post('/deletesinglepartnership','ClientPartnership@DeleteSinglePartnerships');

// Recent Partnerships
Route::get('/recentpartnerships', 'ClientPartnership@RecentPartnerships');

// Partnership Form Image uploads

Route::post('/imageuploadpage','ClientPartnership@PartnershipFormImageUploads');

// Partnership Form

Route::post('/partnershipform','PartnershipFormController@PartnershipForm');

// Get Partnership Form

Route::get('/getpartnershipform','PartnershipFormController@GetPartnershipForm');

// Get Published Partnership Form

Route::get('/getpublishedpartnershipform','PartnershipFormController@GetPublishedPartnershipForm');

// Get Single Partnership Form

Route::get('/getsinglepartnershipform/{id}', 'PartnershipFormController@GetSinglePartnershipForm');

// Publish Form

Route::post('/publishform', 'PartnershipFormController@PublishForm');

// Get Form

Route::get('/getform/{id}', 'PartnershipFormController@GetForm');

// Delete Form

Route::get('/deleteform/{id}', 'PartnershipFormController@DeleteForm');

});
