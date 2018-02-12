import { Component, OnInit } from '@angular/core';
import {PartnershipFormService} from '../partnership-form.service';

declare var $:any;
@Component({
  selector: 'app-step-10',
  templateUrl: './step-10.component.html',
  styleUrls: ['./step-10.component.css']
})
export class Step10Component implements OnInit {
	//read mode
  read_mode=false;

	step_10_question_1 = "Fixed Pricing Guarantee";
	step_10_question_2 = "Nett Advantage Guarantee";
	step_10_question_3 = "Nett Pricing Guarantee";
	step_10_question_4 = "Per Dwelling Support";
	step_10_question_5 = "Display Homes Support - Product";
	step_10_question_6 = "Display Homes Support - Cash";
	step_10_question_7 = "Joint Marketing Material";
	step_10_question_8 = "Joint Marketing Fund";
	step_10_question_9 = "Social Media Support";
	step_10_question_10 = "Training";
	step_10_question_11= "Upsell Program";
	step_10_question_12= "10 Year Warranty";
	step_10_question_1_content = '';
	step_10_question_2_content = '';
	step_10_question_3_content = '';
	step_10_question_4_content = '';
	step_10_question_5_content = '';
	step_10_question_6_content = '';
	step_10_question_7_content = '';
	step_10_question_8_content = '';
	step_10_question_9_content = '';
	step_10_question_10_content = '';
	step_10_question_11_content = '';
	step_10_question_12_content = '';

	step_10_data = {};
  constructor(private form_service:PartnershipFormService) { }

  ngOnInit() {
  	// for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
  	if(localStorage.getItem('step_10_data')){
  		var temp = JSON.parse(localStorage.getItem('step_10_data'));
		this.step_10_question_1 = temp.step_10_question_1;
		this.step_10_question_2 = temp.step_10_question_2;
		this.step_10_question_3 = temp.step_10_question_3;
		this.step_10_question_4 = temp.step_10_question_4;
		this.step_10_question_5 = temp.step_10_question_5;
		this.step_10_question_6 = temp.step_10_question_6;
		this.step_10_question_7 = temp.step_10_question_7;
		this.step_10_question_8 = temp.step_10_question_8;
		this.step_10_question_9 = temp.step_10_question_9;
		this.step_10_question_10 = temp.step_10_question_10;
		this.step_10_question_11 = temp.step_10_question_11;
		this.step_10_question_12 = temp.step_10_question_12;
		this.step_10_question_1_content = temp.step_10_question_1_content;
		this.step_10_question_2_content = temp.step_10_question_2_content;
		this.step_10_question_3_content = temp.step_10_question_3_content;
		this.step_10_question_4_content = temp.step_10_question_4_content;
		this.step_10_question_5_content = temp.step_10_question_5_content;
		this.step_10_question_6_content = temp.step_10_question_6_content;
		this.step_10_question_7_content = temp.step_10_question_7_content;
		this.step_10_question_8_content = temp.step_10_question_8_content;
		this.step_10_question_9_content = temp.step_10_question_9_content;
		this.step_10_question_10_content = temp.step_10_question_10_content;
		this.step_10_question_11_content = temp.step_10_question_11_content;
		this.step_10_question_12_content = temp.step_10_question_12_content;
		this.make_a4();
  	}
  }
  step_10_form_submit(obj){
  	if(!this.read_mode){
	  	if(localStorage.getItem('user')){
	      if(localStorage.getItem('active_form_id')){
	        let form_id = localStorage.getItem('active_form_id');
	        this.step_10_data['form_id'] = form_id;
	      }
	      let temp = {};
			temp['step_10_question_1'] = this.step_10_question_1;
			temp['step_10_question_2'] = this.step_10_question_2;
			temp['step_10_question_3'] = this.step_10_question_3;
			temp['step_10_question_4'] = this.step_10_question_4;
			temp['step_10_question_5'] = this.step_10_question_5;
			temp['step_10_question_6'] = this.step_10_question_6;
			temp['step_10_question_7'] = this.step_10_question_7;
			temp['step_10_question_8'] = this.step_10_question_8;
			temp['step_10_question_9'] = this.step_10_question_9;
			temp['step_10_question_10'] = this.step_10_question_10;
			temp['step_10_question_11'] = this.step_10_question_11;
			temp['step_10_question_12'] = this.step_10_question_12;
			temp['step_10_question_1_content'] = this.step_10_question_1_content;
			temp['step_10_question_2_content'] = this.step_10_question_2_content;
			temp['step_10_question_3_content'] = this.step_10_question_3_content;
			temp['step_10_question_4_content'] = this.step_10_question_4_content;
			temp['step_10_question_5_content'] = this.step_10_question_5_content;
			temp['step_10_question_6_content'] = this.step_10_question_6_content;
			temp['step_10_question_7_content'] = this.step_10_question_7_content;
			temp['step_10_question_8_content'] = this.step_10_question_8_content;
			temp['step_10_question_9_content'] = this.step_10_question_9_content;
			temp['step_10_question_10_content'] = this.step_10_question_10_content;
			temp['step_10_question_11_content'] = this.step_10_question_11_content;
			temp['step_10_question_12_content'] = this.step_10_question_12_content;
	      let user = JSON.parse(localStorage.getItem('user'));
	      this.step_10_data['id'] = user.id;
	      this.step_10_data['form_step_data'] = {'step_10_data': JSON.stringify(temp)};
	      this.step_10_data['status'] = 1;
	      this.step_10_data['complete_status'] = 0;
	      this.form_service.partnership_form_data(this.step_10_data).subscribe((data)=>{
	        if(data.status){
	          if(!(localStorage.getItem('active_form_id'))){
	            localStorage.setItem('active_form_id',data.formdata.form_id);
	          }
	          localStorage.setItem('step_10_data', data['metadata'].value);
	        }
	      })
	    }
  	}
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
        var a4 = $('<div class="page"><div class="jumbotron topBar" style="background-color: #1e1e1e;text-align: right;border-radius: 0;margin-bottom: 0px;padding: 20px 40px 5px 40px;margin-top: 2px;"><img src="images/logo.svg" style="max-height: 45px;"></div><hr class="bottomBar" style="margin: 0;background-color: #c5e74e;padding: 5px;"></div>');
        a4.append(removed);
        $(this).after(a4);
        snipMe.call(a4[0]);
      }
    }

    $(document).ready(function() {
      $('.page').each(function() {
        snipMe.call(this);
      });
    });
  }
 
}
