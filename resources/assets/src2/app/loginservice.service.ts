import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// to catch response from server for responses like 401
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

import {environment} from '../environments/environment';
@Injectable()
export class LoginserviceService {
	sharedData = new BehaviorSubject<object>({});
	currentAdmin = this.sharedData.asObservable();
  currentUser;
  changePassEmail;
  notification ={
    notification_status :false,
    action_status:false,
    notification_message:'',
  };


  constructor(private http:Http,private cookie:CookieService) {
    // setting header
  }

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
    var opts= this.getToken();
	  return this.http.post(environment.apiUrl + 'api/register',obj,opts).map(data=>
	  	data.json());
  }

  login(obj){
  	return this.http.post( environment.apiUrl + 'api/authenticate',obj).map(data=>data.json());
  }
  //verify token
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
  	var opts=this.getToken();
  	return this.http.get(environment.apiUrl + 'api/user',opts).map((data)=>data.json());
  }

  // act as sales
  act_as_sales(obj){
    var opts = this.getToken();
    return this.http.post(environment.apiUrl + 'api/actassales',obj,opts).map((data)=>data.json()).catch(e => {
            //throwing exception for these response status
            if (e.status === 400 || e.status == 401 || e.status == 404) {
              var message = 'Your login token has expired! Please Login again to continue.';
              return Observable.throw(message);
            }
        });
  }

  // reset password
  reset_password(email){
    var opts = this.getToken();
    return this.http.post(environment.apiUrl + 'api/resetpassword',email,opts).map((data)=>data.json()).catch(e => {
            //throwing exception for these response status
            if (e.status === 400 || e.status == 401 || e.status == 404) {
              var message = 'Your login token has expired! Please Login again to continue.';
              return Observable.throw(message);
            }
        });
  }

  forgotPassword(obj){
    var opts=this.getToken();
    return this.http.post(environment.apiUrl +  'api/forgotpassword',obj,opts).map((data)=>data.json());
  }
  changePassword(obj){
    var opts=this.getToken();
    return this.http.post(environment.apiUrl +  'api/changepassword',obj,opts).map((data)=>data.json());
  }
  newPartnership(obj){
    var opts=this.getToken();
    return this.http.post(environment.apiUrl +  'api/createpartnership',obj,opts).map((data)=>data.json());
  }
  getPartnership(){
    var opts=this.getToken();
     return this.http.get(environment.apiUrl +  'api/getpartnership',opts).map((data)=>data.json());
  }
  createUser(obj){
    var opts=this.getToken();
    return this.http.post(environment.apiUrl + 'api/register',obj,opts).map(data=>
      data.json());
  }
  getAllUsers(){
    var opts=this.getToken();
    return this.http.get(environment.apiUrl + 'api/getusers',opts).map((data)=>

      data.json()
    );
  }
  deleteuser(data){
    var opts=this.getToken();
    return this.http.post(environment.apiUrl + 'api/deleteuser',data,opts).map((data)=>

      data.json()
    );
  }

  getsingleuser(data){
    var opts=this.getToken();
   return this.http.get(environment.apiUrl + 'api/getsingleuser/'+data,opts).map((data)=>

     data.json()
   );

 }
 updateuser(data){
   var  opts=this.getToken();
    return this.http.post(environment.apiUrl + 'api/updateuser',data,opts).map((data)=>

     data.json()
   );
 }

}
