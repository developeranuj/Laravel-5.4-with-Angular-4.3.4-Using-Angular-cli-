import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Http } from '@angular/http';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-step-12',
  templateUrl: './step-12.component.html',
  styleUrls: ['./step-12.component.css']
})
export class Step12Component implements OnInit {

  @ViewChild('content') e1:ElementRef;

  step_12_data;
  constructor(private router:Router, private service:NewpartnershipService, private route:ActivatedRoute) { }
  
  nextstep(){
     let step_12 = JSON.parse(localStorage.getItem("steps_html"));
     let temp = document.getElementById("content").innerHTML;
      step_12 = step_12+ temp;

    localStorage.setItem("steps_html",JSON.stringify(step_12));
        
      this.router.navigate(['../step-13'], {relativeTo : this.route });
  }
  ngOnInit() {
  	this.service.getpublishedform().subscribe((data) => {
      console.log(data);

      this.step_12_data = JSON.parse(data.formdata.form_meta[11].value);
      console.log(this.step_12_data);
      
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
