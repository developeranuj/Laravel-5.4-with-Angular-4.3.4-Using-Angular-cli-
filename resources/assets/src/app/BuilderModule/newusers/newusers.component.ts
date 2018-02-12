import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../../loginservice.service';

@Component({
  selector: 'app-newusers',
  templateUrl: './newusers.component.html',
  styleUrls: ['./newusers.component.css']
})
export class NewusersComponent implements OnInit {

  erroStatus=false;
  errMsg;	

  constructor(private service:LoginserviceService) { }

  ngOnInit() {
  }
  
  createUser(obj){
  	  this.service.createUser(obj).subscribe((data)=>{
       if(data.status){
       	this.erroStatus = true;
       	this.errMsg = data.message;
       }
       else{

         this.erroStatus = true;
         this.errMsg = data.message;

       }

    })
  }
}
