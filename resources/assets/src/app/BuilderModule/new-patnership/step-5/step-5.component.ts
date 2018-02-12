import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Http } from '@angular/http';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-step-5',
  templateUrl: './step-5.component.html',
  styleUrls: ['./step-5.component.css']
})
export class Step5Component implements OnInit {

  @ViewChild('content') e1:ElementRef;

  builder;
  step_5_data;
  constructor(private router:Router, private service:NewpartnershipService, private route:ActivatedRoute) { }


  nextstep(){
     let step_5 = JSON.parse(localStorage.getItem("steps_html"));
     let temp = document.getElementById("content").innerHTML;
      step_5 = step_5 + temp;

    localStorage.setItem("steps_html",JSON.stringify(step_5));
        
      this.router.navigate(['../step-6'], {relativeTo : this.route });
  }

  ngOnInit() {
    // getting builder info from localStorage
    this.builder = JSON.parse(localStorage.getItem('selectedclient')).getclient[0];
  	 this.service.getpublishedform().subscribe((data) => {
      console.log(data);
      // setting builder name in the form
      this.step_5_data = JSON.parse(data.formdata.form_meta[4].value.replace(/@@@builder_name@@@/gi, "<strong>" + this.builder.client_name + "</strong>"));
      console.log(this.step_5_data);
     });
  }

  print(){
    // let step_15 = JSON.parse(localStorage.getItem("steps_html"));
    //  let temp = document.getElementById("content").innerHTML;
    //   step_15 = step_15 + temp;

    // localStorage.setItem("steps_html",JSON.stringify(step_15));

    // let step_1 = document.getElementById("content").innerHTML;
    
    // this.test_variable = step_15;
        
     let pdf = new jsPDF();
     

        let options = {
            pagesplit: true

        };
        pdf.addHTML(this.e1.nativeElement, 0, 0, options, () => {
            pdf.save("test.pdf");
        
        });
  }

}
