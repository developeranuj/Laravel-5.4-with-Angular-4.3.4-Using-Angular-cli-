import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Http } from '@angular/http';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.css']
})
export class Step3Component implements OnInit {
  temp_html;
  @ViewChild('content') e1:ElementRef;
  //Step-3 varibales
   step_3_data = '';
   step_3_heading1="Contact Details";
   step_3_heading2="Trader Contact Details";
    clients= [];
    traders = [];
    selectedtrader={};
    // selectedClient ={};
    selectedtraderdetail=[];
    selectedClientdetail=[];
    builderselected;

    formData:any={};
  constructor(private router:Router, private service:NewpartnershipService, private route:ActivatedRoute) { }

  nextstep(){
    
    this.formData['trader'] = this.selectedtrader['id']; //id of users from users table
    localStorage.setItem('formData', JSON.stringify(this.formData));

     let step_3 = JSON.parse(localStorage.getItem("steps_html"));
     let temp = document.getElementById("content").innerHTML;
      step_3 = step_3 + temp;

    

    localStorage.setItem("steps_html",JSON.stringify(step_3));
      
  
      this.router.navigate(['../step-4'], {relativeTo : this.route });
  }


 gettraderdata(data){
   console.log(data);
  this.service.getsingleuser(data.id)
    .subscribe((data) => {
       console.log(data);
       if(data.userdata){
          this.selectedtraderdetail = data.userdata;
       }
    });
 }
  ngOnInit() {

    // get if any data is already filled
    if(localStorage.getItem('formData')){
      this.formData = JSON.parse(localStorage.getItem('formData'));
    }

    if(localStorage.getItem("selectedclient"))
     {
      console.log(JSON.parse(localStorage.getItem("selectedclient")));
      this.builderselected = JSON.parse(localStorage.getItem("selectedclient"));
      this.selectedClientdetail = this.builderselected.getclient;
     }
     this.service.getpublishedform().subscribe((data) => {
      console.log(data);

      this.step_3_data = JSON.parse(data.formdata.form_meta[2].value);
      console.log(this.step_3_data);
     });

    this.service.getclients().subscribe((data) => {
   
     this.clients = data.getclients;
    });

    this.service.getAllUsers()
    .subscribe((data) => {
       console.log(data);
       this.traders = data.users;
       console.log(this.traders);
    });
  }

  print(){
    // let step_15 = JSON.parse(localStorage.getItem("steps_html"));
    //  let temp = document.getElementById("content").innerHTML;
    //   step_15 = step_15 + temp;

    // localStorage.setItem("steps_html",JSON.stringify(step_15));

    // let step_1 = document.getElementById("content").innerHTML;
    
    // this.test_variable = step_15;
        this.temp_html = JSON.parse(localStorage.getItem("steps_html"));
     let pdf = new jsPDF();
     

        let options = {
            pagesplit: true

        };
        pdf.addHTML(this.e1.nativeElement, 0, 0, options, () => {
            pdf.save("test.pdf");
        
        });
  }

}
