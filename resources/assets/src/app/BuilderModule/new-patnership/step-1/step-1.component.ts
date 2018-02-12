import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Http } from '@angular/http';
import * as jsPDF from 'jspdf';
import {NewpartnershipService} from '../newpartnership.service';

import {LoginserviceService} from '../../../loginservice.service';
//date picker
import {IMyDpOptions} from 'mydatepicker';
@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
export class Step1Component implements OnInit {

  @ViewChild('content') e1:ElementRef;
  panterdata:any;
  erroStatus = false;
  errMsg;

  //step-1 variables
  clients=[];
  selectedClient={};
  step_1_data ="";
  builderselected=[];

    date_from:any;
    end_date:any;

  date_from_options: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    
    end_options:IMyDpOptions;
    
    formData:any={};

  constructor(private router:Router, private service:NewpartnershipService, private route:ActivatedRoute,private loginService:LoginserviceService) { }

  getclientdata(client)
  {
    this.service.getsingleclient(client.id)
    .subscribe((data) => {
       console.log(data);
       localStorage.setItem("selectedclient",JSON.stringify(data));
       this.builderselected = data.getclient;
    });

  }
  


  ngOnInit() {
    // get if any data is already filled
    if(localStorage.getItem('formData')){
      this.formData = JSON.parse(localStorage.getItem('formData'));
    }

    this.service.getclients().subscribe((data) => {
     this.clients = data.getclients;
    });

    this.service.getpublishedform().subscribe((data) => {
      this.step_1_data = JSON.parse(data.formdata.form_meta[0].value);
    });
  }

  // setting limit for end date
  limitDate(event){

      this.end_options = {
        // other options...
        disableDateRanges:[{begin: {year: 1000 , month: 1, day: 1}, end: {year: event.date.year, month: event.date.month, day: event.date.day}}],
        minYear:event.date.year,
        dateFormat: 'dd.mm.yyyy',
    };
  }
  
  nextstep(){

    this.formData['builder'] = this.selectedClient['id'];
    this.formData['date_from'] = this.date_from;
    this.formData['date_end'] = this.end_date;
    localStorage.setItem('formData', JSON.stringify(this.formData));
    if(this.date_from&& this.end_date){

      let step_1 = document.getElementById("content").innerHTML;

      localStorage.setItem("steps_html",JSON.stringify(step_1));
      this.router.navigate(['../step-2'], {relativeTo : this.route });
    }
    else{
      this.loginService.notification.notification_status=true;
      this.loginService.notification.action_status = false;
      this.loginService.notification.notification_message="Please choose dates.";
      window.setTimeout(() => {
        this.loginService.notification.notification_status = false;
        this.loginService.notification.action_status = false;
        this.loginService.notification.notification_message='';
      }, 2500);
    }    
  }

}
