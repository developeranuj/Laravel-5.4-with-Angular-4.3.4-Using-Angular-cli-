import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../../loginservice.service';
import {Router } from'@angular/router';
import * as swal  from 'sweetalert';

import  { BuilderserviceService } from '../../builderservice.service';
@Component({
  selector: 'app-builder-dasboard',
  templateUrl: './builder-dasboard.component.html',
  styleUrls: ['./builder-dasboard.component.css']
})
export class BuilderDasboardComponent implements OnInit {

  recentPartnerships;
  expiringPartnerships;
  currentDate = new Date();
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
    this.builderService.getRecentPartnerships().subscribe((data) => {
      if(data.status){
        this.recentPartnerships = data.partnerships.recent;
        this.expiringPartnerships = data.partnerships.expiring;
      }
      else{
        console.log(data, 'false');
      }
    });
    if(this.service.notification.notification_status){
      window.setTimeout(() => {
          this.service.notification.notification_status = false;
          this.service.notification.action_status = false;
          this.service.notification.notification_message='';
        }, 2500);
    }

  }

}
