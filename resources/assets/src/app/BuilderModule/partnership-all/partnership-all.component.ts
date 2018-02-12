import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../../loginservice.service';
import { BuilderserviceService } from  '../../builderservice.service';
import {Router } from'@angular/router';
import * as swal  from 'sweetalert';

@Component({
  selector: 'app-partnership-all',
  templateUrl: './partnership-all.component.html',
  styleUrls: ['./partnership-all.component.css']
})
export class PartnershipAllComponent implements OnInit {

  partnerships;
  constructor(private service:LoginserviceService, private route:Router, private builderService: BuilderserviceService) { }
   
 getpartnerform(){
     this.service.getpublishedform().subscribe((data) => {
       if(data.formdata == null)
       {
       	swal("No Form is published Yet.")
       }
       else{
       	this.route.navigate(['/partnership/create/']);
       }
     });
  }

  ngOnInit() {
    this.builderService.getPartnerships().subscribe((data) => {
      if(data.status){
        this.partnerships = data.getpartnerships;
      }
    })
  }

}
