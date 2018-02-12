import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Http } from '@angular/http';

import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-step-9',
  templateUrl: './step-9.component.html',
  styleUrls: ['./step-9.component.css']
})
export class Step9Component implements OnInit {
  @ViewChild('content') e1:ElementRef;
 step_9_data;
 step_9_images=[];

  constructor(private router:Router, private service:NewpartnershipService, private route:ActivatedRoute) { }

   nextstep(){
     let step_9 = JSON.parse(localStorage.getItem("steps_html"));
     let temp = document.getElementById("content").innerHTML;
      step_9 = step_9 + temp;

    localStorage.setItem("steps_html",JSON.stringify(step_9));
        
      this.router.navigate(['../step-10'], {relativeTo : this.route });
  }

  ngOnInit() {
  	this.service.getpublishedform().subscribe((data) => {
      console.log(data);

      this.step_9_data = JSON.parse(data.formdata.form_meta[8].value);
      console.log(this.step_9_data);
      this.step_9_images = this.step_9_data.step_9_images;
        console.log(this.step_9_images);
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
