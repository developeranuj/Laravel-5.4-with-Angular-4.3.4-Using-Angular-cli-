import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';
@Injectable()
export class BuilderserviceService {

  constructor(private http:Http) { }
  createClients(obj){
    return this.http.post(environment.apiUrl + 'api/createclients',obj).map((data)=>data.json());
  }
  getClients(){
    return this.http.get(environment.apiUrl + 'api/getclients').map(data=>
      data.json());
  }
  getSingleClient(id){
  	return this.http.get(environment.apiUrl + 'api/getsingleclient/' + id).map((data)=>data.json());
  }
  updateClient(obj){
    return this.http.post(environment.apiUrl + 'api/updateclient/', obj).map((data)=>data.json());
  }

  builderImageUpload(obj){
    return this.http.post(environment.apiUrl+'api/builderimage',obj).map((data)=>data.json());
  }
  deleteBuilder(id){
    return this.http.get(environment.apiUrl +'api/deletesingleclient/' +id).map((data)=>data.json());
  }
  

  //partnsership forms
  getPartnerships(){
    return this.http.get(environment.apiUrl + 'api/getpartnership/').map((data) => data.json());
  }

  //recent Partnerships
  getRecentPartnerships(){
    return this.http.get(environment.apiUrl + 'api/recentpartnerships/').map((data) => data.json());
  }

  
}
