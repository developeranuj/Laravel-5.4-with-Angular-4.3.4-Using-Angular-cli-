import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';

@Injectable()
export class NewpartnershipService {

  constructor(private http:Http) { }

  getsingleclient(id){

  	return this.http.get(environment.apiUrl + 'api/getsingleclient/'+id).map((data)=>
	  	data.json());
  }

  getclients(){

  	return this.http.get(environment.apiUrl + 'api/getclients').map((data)=>
	  	data.json());
  }
  getsingleuser(id){

    return this.http.get(environment.apiUrl + 'api/getsingleuser/'+id).map((data)=>
      data.json());
  }

  getpublishedform(){

  	return this.http.get(environment.apiUrl + 'api/getpublishedpartnershipform').map((data)=>
	  	data.json());
  }
  getAllUsers(){
    return this.http.get(environment.apiUrl + 'api/getusers').map((data)=>
      
      data.json()
    );
  }

  //submit form
  submitForm(formData){
    return this.http.post(environment.apiUrl + 'api/createpartnership', formData).map((data) => data.json());
  }

}
