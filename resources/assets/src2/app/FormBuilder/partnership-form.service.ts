import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import {environment}  from '../../environments/environment';
@Injectable()
export class PartnershipFormService {


  // form variables
  default_draft = false;
  current_form;

  constructor( private http:Http) { }
  //to token
  getToken(){
     let temp = JSON.parse(localStorage.getItem('user'));
     let token = temp.user_token;
     let header = new Headers();
     header.append('Authorization', token);
     let opts = new RequestOptions();
     opts.headers = header;
     return opts;
   }

  // to upload image
  image_upload(obj){
    var opts=this.getToken();
  	return this.http.post(environment.apiUrl+'api/imageuploadpage',obj,opts).map((data)=>data.json());
  }
  
  // to upload form data
  partnership_form_data(obj){
    var opts=this.getToken();
  	return this.http.post(environment.apiUrl+ 'api/partnershipform', obj,opts).map((data)=>data.json());
  }
  
  //get published form
  getpublishedform(){

    return this.http.get(environment.apiUrl + 'api/getpublishedpartnershipform').map((data)=>
      data.json());
  }

  //get all forms
  getallForms(){
    var opts=this.getToken();
  	return this.http.get(environment.apiUrl+ 'api/getpartnershipform',opts).map((data)=>data.json());
  }
  
  //get single form
  getForm(id){
    var opts=this.getToken()
    return this.http.get(environment.apiUrl+ 'api/getsinglepartnershipform/' + id,opts).map((data)=>data.json());
  }
  
  //publish form
  publish_form(obj){
    var opts=this.getToken();
    return this.http.post(environment.apiUrl+ 'api/publishform',obj,opts).map((data)=>data.json());
  }
  
  //form check for its completion
  check_form(id){
    var opts=this.getToken();
    return this.http.get(environment.apiUrl+ 'api/getform/' +id,opts).map((data)=>data.json());
  }
  
  //delete form
  delete_form(id){
    var opts=this.getToken();
    return this.http.get(environment.apiUrl+ 'api/deleteform/'+id,opts).map((data)=>data.json());
  }
  
  // clear localstorage
  clean_localstorage(){
    // refreshing localStorage
      var x = localStorage.getItem('user');
      localStorage.clear();
      localStorage.setItem('user',x);
  }
}

