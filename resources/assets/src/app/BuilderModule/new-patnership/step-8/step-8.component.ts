import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Http } from '@angular/http';
import * as jsPDF from 'jspdf';

declare var $:any;
@Component({
  selector: 'app-step-8',
  templateUrl: './step-8.component.html',
  styleUrls: ['./step-8.component.css']
})
export class Step8Component implements OnInit {
  
  @ViewChild('content') e1:ElementRef;
  
  step_8_data='';
  step_8_images:any;

  constructor(private router:Router, private service:NewpartnershipService, private route:ActivatedRoute) { }
  
  nextstep(){
     let step_8 = JSON.parse(localStorage.getItem("steps_html"));
     let temp = document.getElementById("content").innerHTML;
      step_8 = step_8 + temp;

    localStorage.setItem("steps_html",JSON.stringify(step_8));
        
      this.router.navigate(['../step-9'], {relativeTo : this.route });
  }
  
  ngOnInit() {
    var self = this;
  	this.service.getpublishedform().subscribe((data) => {

      this.step_8_data = JSON.parse(data.formdata.form_meta[7].value);
      this.step_8_images = this.step_8_data;
      setTimeout(function(){
        self.make_a4();
        // $('#trigger').trigger('click');
      },500);
     });
    this.make_a4();
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

  make_a4(){
    var max_pages = 100;
    var page_count = 0;

    function snipMe() {
      page_count++;
      if (page_count > max_pages) {
        return;
      }
      var long = $(this)[0].scrollHeight - 842;
      console.log(long);
      var children = $(this).children().toArray();
      var removed = [];
      while (long > 0 && children.length > 0) {
        var child = children.pop();
        $(child).detach();
        removed.unshift(child);
        long = $(this)[0].scrollHeight - 842;
      }
      if (removed.length > 0) {
        var a4 = $('<div class="pdf_content step_2" style="height: 840px;background-color: #fff;box-shadow: 0 4px 5px rgba(75, 75, 75, 0.2);box-sizing: border-box;border-bottom: 1px solid #000;"><div class="jumbotron topBar" style="background-color:#1e1e1e;text-align:right;border-radius: 0;margin-bottom: 0px;padding: 20px 40px 5px 40px;margin-top: 2px;"><img src="images/logo.svg" style="max-height: 45px;"></div><hr class="bottomBar" style="margin: 0;background-color: #c5e74e;padding: 5px;"></div>');
        a4.append(removed);
        $(this).after(a4);
        snipMe.call(a4[0]);
      }
    }

    $(document).ready(function() {
      $('.pdf_content').each(function() {
        console.log(this,'form calling')
        snipMe.call(this);
      });
    });
  }

}
