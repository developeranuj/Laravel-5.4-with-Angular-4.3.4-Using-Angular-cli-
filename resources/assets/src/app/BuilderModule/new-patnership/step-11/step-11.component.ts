import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Http } from '@angular/http';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-step-11',
  templateUrl: './step-11.component.html',
  styleUrls: ['./step-11.component.css']
})
export class Step11Component implements OnInit {

  @ViewChild('content') e1:ElementRef;

   step_11_data;
  builder;
  constructor(private router:Router, private service:NewpartnershipService, private route:ActivatedRoute) { }

  nextstep(){
     let step_11 = JSON.parse(localStorage.getItem("steps_html"));
     let temp = document.getElementById("content").innerHTML;
      step_11 = step_11 + temp;

    localStorage.setItem("steps_html",JSON.stringify(step_11));
        
      this.router.navigate(['../step-12'], {relativeTo : this.route });
  }

  ngOnInit() {
    // getting builder info from localStorage
    this.builder = JSON.parse(localStorage.getItem('selectedclient')).getclient[0];
  	this.service.getpublishedform().subscribe((data) => {

      this.step_11_data = JSON.parse(data.formdata.form_meta[10].value.replace(/@@@license@@@/gi, "<strong>" + this.builder.client_name + "</strong>"));
      
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
