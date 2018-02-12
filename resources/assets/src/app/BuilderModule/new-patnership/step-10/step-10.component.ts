import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {Router, ActivatedRoute} from '@angular/router';

declare var $:any;
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-step-10',
  templateUrl: './step-10.component.html',
  styleUrls: ['./step-10.component.css']
})
export class Step10Component implements OnInit {

  @ViewChild('content') e1:ElementRef;
   
   builder;

   formData:any={};

   step_10_data;
   // question 1 variables
   step_10_question_1 = true;
   step_10_question_1_content = false;
   step_10_question_1_checkbox = false;
   step_10_question_1_answer_1;
   step_10_question_1_answer_2;
   //question 2 variable
   step_10_question_2 = true;
   step_10_question_2_checkbox = false;
   // question 3 variable
   step_10_question_3 = true;
   step_10_question_3_checkbox = false;
   // question 4 variable
   step_10_question_4 = true;
   step_10_question_4_checkbox = false;
   step_10_question_4_answer_1;
   step_10_question_4_answer_2;
   step_10_question_4_content = false;
   //question 5 variable
   step_10_question_5 = true;
   step_10_question_5_checkbox= false;
   step_10_question_5_answer_1;
   step_10_question_5_content = false;
   //question 6 variable
   step_10_question_6 = true;
   step_10_question_6_checkbox= false;
   step_10_question_6_answer_1;
   step_10_question_6_answer_2;
   step_10_question_6_content = false;
   //question 7 variable
   step_10_question_7 = true;
   step_10_question_7_checkbox= false;
   step_10_question_7_answer_1;
   step_10_question_7_content = false;
   //question 8 variable
   step_10_question_8 = true;
   step_10_question_8_checkbox= false;
   step_10_question_8_answer_1;
   step_10_question_8_content = false;
   //question 9 variable
   step_10_question_9 = true;
   step_10_question_9_checkbox= false;
   step_10_question_9_answer_1;
   step_10_question_9_content = false;
   //question 10 variable
   step_10_question_10 = true;
   step_10_question_10_checkbox= false;
   step_10_question_10_content = false;
   //question 11 variable
   step_10_question_11 = true;
   step_10_question_11_checkbox= false;
   step_10_question_11_content = false;
   //question 12 variable
   step_10_question_12 = true;
   step_10_question_12_checkbox= false;
   step_10_question_12_content = false;
  constructor(private route:ActivatedRoute,private router:Router,private service:NewpartnershipService) { }

  ngOnInit() {

    // get if any data is already filled
    if(localStorage.getItem('formData')){
      this.formData = JSON.parse(localStorage.getItem('formData'));
    }

    this.builder = JSON.parse(localStorage.getItem('selectedclient')).getclient[0];
    console.log(this.builder.client_name, 'builder name');
    // get data from server
    this.service.getpublishedform().subscribe((data) => {

      // replacing getting data from server and builder name
      this.step_10_data = JSON.parse(data.formdata.form_meta[9].value.replace(/@@@builder_name@@@/gi,"<strong>" + this.builder.client_name + "</strong>"));
      console.log(this.step_10_data);
     });
  }


  step_10_question_1_submit(){
    if(this.step_10_question_1_answer_1 && this.step_10_question_1_answer_2 ){
      this.step_10_question_1 = false;
      this.step_10_question_1_checkbox = false;
      this.step_10_question_1_content = true;
      this.step_10_data.step_10_question_1_content = this.step_10_data.step_10_question_1_content.replace(/@@from@@/gi, "<strong>" + this.step_10_question_1_answer_1 + "</strong>");
      this.step_10_data.step_10_question_1_content = this.step_10_data.step_10_question_1_content.replace(/@@to@@/gi, "<strong>" + this.step_10_question_1_answer_2 + "</strong>");
      this.make_a4();
    }
    else{
      return false;
    }
  }

  step_10_question_2_submit(){
    this.step_10_question_2 = false;
    this.make_a4();
  }

  step_10_question_3_submit(){
    this.step_10_question_3 = false;
    this.make_a4();
  }

  step_10_question_4_submit(){
    if(this.step_10_question_4_answer_1 && this.step_10_question_4_answer_2){
      this.step_10_question_4 = false;
      this.step_10_question_4_checkbox = false;
      this.step_10_question_4_content = true;
      this.step_10_data.step_10_question_4_content = this.step_10_data.step_10_question_4_content.replace(/@@@house_amount@@@/gi, "<strong>" + this.step_10_question_4_answer_1 + "</strong>");
      this.step_10_data.step_10_question_4_content = this.step_10_data.step_10_question_4_content.replace(/@@@units_amount@@@/gi, "<strong>" + this.step_10_question_4_answer_2 + "</strong>");
      this.make_a4();
    }
    else{
      return false;
    }
  }

  step_10_question_5_submit(){
    if(this.step_10_question_5_answer_1){
      this.step_10_question_5 = false;
      this.step_10_question_5_checkbox = false;
      this.step_10_question_5_content = true;
      this.step_10_data.step_10_question_5_content = this.step_10_data.step_10_question_5_content.replace(/@@@support_product_amount@@@/gi, "<strong>" + this.step_10_question_5_answer_1 + "</strong>");
      this.make_a4();
    }
    else{
      return false;
    }
  }

  step_10_question_6_submit(){
    if(this.step_10_question_6_answer_1 && this.step_10_question_6_answer_2){
      this.step_10_question_6 = false;
      this.step_10_question_6_checkbox = false;
      this.step_10_question_6_content = true;
      this.step_10_data.step_10_question_6_content = this.step_10_data.step_10_question_6_content.replace(/@@@support_cash_amount@@@/gi, "<strong>" + this.step_10_question_6_answer_1 + "</strong>");
      this.step_10_data.step_10_question_6_content = this.step_10_data.step_10_question_6_content.replace(/@@@support_year@@@/gi, "<strong>" + this.step_10_question_6_answer_2 + "</strong>");
      this.make_a4();
    }
    else{
      return false;
    }
  }

  step_10_question_7_submit(){
    if(this.step_10_question_7_answer_1){
      this.step_10_question_7 = false;
      this.step_10_question_7_checkbox = false;
      this.step_10_question_7_content = true;
      this.step_10_data.step_10_question_7_content = this.step_10_data.step_10_question_7_content.replace(/@@@marketing_material_amount@@@/gi, "<strong>" + this.step_10_question_7_answer_1 + "</strong>");
      this.make_a4();
    }
    else{
      return false;
    }
  }

  step_10_question_8_submit(){
    if(this.step_10_question_8_answer_1){
      this.step_10_question_8 = false;
      this.step_10_question_8_checkbox = false;
      this.step_10_question_8_content = true;
      this.step_10_data.step_10_question_8_content = this.step_10_data.step_10_question_8_content.replace(/@@@marketing_fund_amount@@@/gi, "<strong>" + this.step_10_question_8_answer_1 + "</strong>");
      this.make_a4();
    }
    else{
      return false;
    }
  }

  step_10_question_9_submit(){
    if(this.step_10_question_9_answer_1){
      this.step_10_question_9 = false;
      this.step_10_question_9_checkbox = false;
      this.step_10_question_9_content = true;
      this.step_10_data.step_10_question_9_content = this.step_10_data.step_10_question_9_content.replace(/@@@promotional_opportunities@@@/gi, "<strong>" + this.step_10_question_9_answer_1 + "</strong>");
      this.make_a4();
    }
    else{
      return false;
    }
  }

  step_10_question_10_submit(){
    this.step_10_question_10 = false;
    this.step_10_question_10_content = true;
    this.make_a4();
  }

  step_10_question_11_submit(){
    this.step_10_question_11 = false;
    this.step_10_question_11_content = true;
    this.make_a4();
  }

  step_10_question_12_submit(){
    this.step_10_question_12 = false;
    this.step_10_question_12_content = true;
    this.make_a4();
  }

  refresh(){
    // question 1 reset
    this.step_10_question_1_content = false;
    this.step_10_question_1 = true;
    this.step_10_question_1_checkbox = false;
    this.step_10_question_1_answer_1 ='';
    this.step_10_question_1_answer_2 ='';

    //question 2 reset
    this.step_10_question_2 = true;
    this.step_10_question_2_checkbox = false;

    //question 3 reset
    this.step_10_question_3 = true;
    this.step_10_question_3_checkbox = false;

    // question 4 reset
    this.step_10_question_4 = true;
    this.step_10_question_4_checkbox = false;
    this.step_10_question_4_answer_1 ='';
    this.step_10_question_4_answer_2 ='';
    this.step_10_question_4_content = false;

    //question 5 reset
    this.step_10_question_5 = true;
    this.step_10_question_5_checkbox = false;
    this.step_10_question_5_answer_1 ='';
    this.step_10_question_5_content = false;

    //question 6 reset
    this.step_10_question_6 = true;
    this.step_10_question_6_checkbox = false;
    this.step_10_question_6_answer_1 ='';
    this.step_10_question_6_answer_2 ='';
    this.step_10_question_6_content = false;

    //question 7 reset
    this.step_10_question_7 = true;
    this.step_10_question_7_checkbox = false;
    this.step_10_question_7_answer_1 ='';
    this.step_10_question_7_content = false;

    //question 8 reset
    this.step_10_question_8 = true;
    this.step_10_question_8_checkbox = false;
    this.step_10_question_8_answer_1 ='';
    this.step_10_question_8_content = false;

    //question 9 reset
    this.step_10_question_9 = true;
    this.step_10_question_9_checkbox = false;
    this.step_10_question_9_answer_1 ='';
    this.step_10_question_9_content = false;

    //question 10 reset
    this.step_10_question_10 = true;
    this.step_10_question_10_checkbox = false;
    this.step_10_question_10_content = false;

    //question 11 reset
    this.step_10_question_11 = true;
    this.step_10_question_11_checkbox = false;
    this.step_10_question_11_content = false;

    //question 12 reset
    this.step_10_question_12 = true;
    this.step_10_question_12_checkbox = false;
    this.step_10_question_12_content = false;
  }


  //next strep
  nextstep(){
    this.step_10_question_1=false;
    this.step_10_question_2=false;
    this.step_10_question_4=false;
    this.step_10_question_5=false;
    this.step_10_question_6=false;
    this.step_10_question_7=false;
    this.step_10_question_8=false;
    this.step_10_question_9=false;
    this.step_10_question_10=false;
    this.step_10_question_11=false;
    this.step_10_question_12=false;

    //saving all answers
    this.formData['fixed_pricing_guarantee_from'] = this.step_10_question_1_answer_1;
    this.formData['fixed_pricing_guarantee_to'] = this.step_10_question_1_answer_2;
    this.formData['nett_advantage_guarantee'] = this.step_10_question_2_checkbox;
    this.formData['nett_pricing_guarantee'] = this.step_10_question_3_checkbox;
    this.formData['per_dwelling_support_house_amount'] = this.step_10_question_4_answer_1;
    this.formData['per_dwelling_support_units_amount'] = this.step_10_question_4_answer_2;
    this.formData['display_home_support_product'] = this.step_10_question_5_answer_1;
    this.formData['display_home_support_cash_amount'] = this.step_10_question_6_answer_1;
    this.formData['display_home_support_cash_year'] = this.step_10_question_6_answer_2;
    this.formData['joint_marketing_material'] = this.step_10_question_7_answer_1;
    this.formData['joint_marketing_fund'] = this.step_10_question_8_answer_1;
    this.formData['social_media_support'] = this.step_10_question_9_answer_1;
    this.formData['training'] = this.step_10_question_10_checkbox;
    this.formData['upsell_program'] = this.step_10_question_11_checkbox;
    this.formData['year_warranty'] = this.step_10_question_11_checkbox;

    localStorage.setItem('formData', JSON.stringify(this.formData));
    

    console.log(this.formData,'final-data');
     let step_10 = JSON.parse(localStorage.getItem("steps_html"));
     let temp = document.getElementById("content").innerHTML;
      step_10 = step_10 + temp;

    localStorage.setItem("steps_html",JSON.stringify(step_10));

      this.router.navigate(['../step-11'], {relativeTo : this.route });
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
        snipMe.call(this);
        console.log("calling",this);
      });
    });
  }
}
