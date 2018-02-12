import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../../loginservice.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

	allusers;

  constructor(private service:LoginserviceService) { }

  ngOnInit() {

  	this.service.getAllUsers().subscribe((data)=>{

  		if(data.status){
  			this.allusers= data.userdata;
  		}
  		
  	}) 

  }

}
