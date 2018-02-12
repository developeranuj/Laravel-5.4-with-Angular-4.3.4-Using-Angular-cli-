import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// to catch response from server for responses like 401
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';

import {environment} from '../environments/environment';
@Injectable()
export class LoginserviceService {
  showhidenav :boolean = false;
	sharedData = new BehaviorSubject<object>({});
	currentAdmin = this.sharedData.asObservable();
  changePassEmail;
  notification ={
    notification_status :false,
    action_status:false,
    notification_message:'',
  };
  constructor(private http:Http) { }
  getToken(){
      if(localStorage.getItem('user')){
       let temp = JSON.parse(localStorage.getItem('user'));
       let token = temp.user_token;
       let header = new Headers();
       header.append('Authorization', token);
       let opts = new RequestOptions();
       opts.headers = header;
       return opts;
      }
   }
  register(obj){
	  return this.http.post(environment.apiUrl + 'api/register',obj).map(data=>
	  	data.json());
  }

  login(obj){
  	return this.http.post( environment.apiUrl + 'api/authenticate',obj).map(data=>data.json());
  }
  //logout
  logout(obj){
    var opts= this.getToken();
    return this.http.post(environment.apiUrl + 'api/logout',obj,opts).map(data=>data.json()).catch(e => {
            //throwing exception for these response status
            if (e.status === 400 || e.status == 401 || e.status == 404) {
              var message = 'Your login token has expired! Please Login again to continue.';
              return Observable.throw(message);
            }
        });
  }

  //verify token pass any random value
  token_check(obj): Observable<object>{
    var opts = this.getToken();
    return this.http.post(environment.apiUrl +'api/verifytoken',obj,opts).map(data=>data.json()).catch(e => {
            //throwing exception for these response status
            if (e.status === 400 || e.status == 401 || e.status == 404) {
              var message = 'Your login token has expired! Please Login again to continue.';
              return Observable.throw(message);
            }
        });
  }
  changeToken(user) {
    this.sharedData.next(user);
  }
  getUser(token){
  	let header = new Headers();
  	header.append('Authorization', token );
  	 let opts = new RequestOptions();
	  opts.headers = header;
  	return this.http.get(environment.apiUrl + 'api/user',opts).map((data)=>data.json());
  }
  forgotPassword(obj){
    return this.http.post(environment.apiUrl +  'api/forgotpassword',obj).map((data)=>data.json());
  }
  changePassword(obj){
    return this.http.post(environment.apiUrl +  'api/changepassword',obj).map((data)=>data.json());
  }
  newPartnership(obj){
    return this.http.post(environment.apiUrl +  'api/createpartnership',obj).map((data)=>data.json());
  }
  getPartnership(){
     return this.http.get(environment.apiUrl +  'api/getpartnership').map((data)=>data.json());
  }
  createUser(obj){
    return this.http.post(environment.apiUrl + 'api/register',obj).map(data=>
      data.json());
  }
  getAllUsers(){
    return this.http.get(environment.apiUrl + 'api/getusers').map((data)=>

      data.json()
    );
  }
  changeUserPassword(obj){
    return this.http.post(environment.apiUrl + 'api/changeuserpassword',obj).map((data)=>

      data.json()
    );
  }

  getpublishedform(){

    return this.http.get(environment.apiUrl + 'api/getpublishedpartnershipform').map((data)=>
      data.json());
  }

  // clear localstorage
  clean_localstorage(){
    // refreshing localStorage
      var x = localStorage.getItem('user');
      localStorage.clear();
      localStorage.setItem('user',x);
  }
}
