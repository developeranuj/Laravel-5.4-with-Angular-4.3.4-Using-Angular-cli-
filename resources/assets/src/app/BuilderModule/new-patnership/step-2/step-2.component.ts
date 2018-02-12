import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Http } from '@angular/http';
import * as jsPDF from 'jspdf';

declare var $:any;
@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.css']
})
export class Step2Component implements OnInit {

@ViewChild('content') e1:ElementRef;
	//Step-2 varibale
   temp = '';
  step_2_data="";
  test_variable;
  constructor(private router:Router, private service:NewpartnershipService, private route:ActivatedRoute) { }

  nextstep(){
    this.make_a4();
     let step_2 = JSON.parse(localStorage.getItem("steps_html"));

     let temp = document.getElementById("content").innerHTML;
      step_2 = step_2 + temp;
      console.log(temp);
    localStorage.setItem("steps_html",JSON.stringify(step_2));
      
  
      this.router.navigate(['../step-3'], {relativeTo : this.route });


  }

  ngOnInit() {
     var self = this;
    this.service.getpublishedform().subscribe((data) => {
      this.step_2_data = JSON.parse(data.formdata.form_meta[1].value);
      // this.make_a4();
      setTimeout(function(){
        self.make_a4();
        // $('#trigger').trigger('click');
      },500);

     });
    // this.make_a4();
    
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
        var a4 = $('<div class="pdf_content step_2" style="height: 840px;background-color: #fff;box-shadow: 0 4px 5px rgba(75, 75, 75, 0.2);padding:35px;box-sizing: border-box;border-bottom: 1px solid #000;"></div>');
        a4.append(removed);
        $(this).after(a4);
        snipMe.call(a4[0]);
      }
    }

    
      $('.pdf_content').each(function() {
        console.log(this,'form calling')
        snipMe.call(this);
      });
   

  }

}
