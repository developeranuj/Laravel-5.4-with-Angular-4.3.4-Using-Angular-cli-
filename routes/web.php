<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any('/traders', function () {
	 return view('welcome');
});

Route::any('/traders/{childall}', function () {

	return view('welcome');
})->where('childall','.*');


Route::any('/admin', function () {
	 return view('welcome2');
});

Route::any('/admin/{child}', function () {

	return view('welcome2');
})->where('child','.*');

Route::any('/admin-tools/', function () {

	return view('welcome2');
});

Route::any('/admin-tools/{sub_child}', function () {

	return view('welcome2');
})->where('sub_child','.*');

Route::any('{all}', function () {
    return view('welcome');
})->where('all','.*');
