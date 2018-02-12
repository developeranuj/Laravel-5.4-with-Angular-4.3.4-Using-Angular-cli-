import { Component, OnInit } from '@angular/core';
import {PartnershipFormService} from '../partnership-form.service';
@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.css']
})
export class Step3Component implements OnInit {
	contact_Region="Region";
	contact_Executive="Executive Contact";
	trader_Contact="Conatct";
	contact_Address="Address";
	contact_ACN="ACN";
	trader_Mobile="Mobile";
	trader_email="Email";

	step_3_data = {}

  //read mode
  read_mode=false;
  constructor(private form_service :PartnershipFormService ) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
    // fetching data from localStorage
  	if(localStorage.getItem('step_3_data')){
  		var temp = JSON.parse(localStorage.getItem('step_3_data'));
    	this.contact_Region	 = temp.contact_Region;
    	this.contact_Executive = temp.contact_Executive;
    	this.trader_Contact = temp.trader_Contact;
    	this.contact_Address = temp.contact_Address;
    	this.contact_ACN = temp.contact_ACN;
    	this.trader_Mobile = temp.trader_Mobile;
    	this.trader_email = temp.trader_email;
  	}
  }

  step_3_form_submit(obj){
    if(!this.read_mode){
    	if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_3_data['form_id'] = form_id;
        }
        let user = JSON.parse(localStorage.getItem('user'));
        this.step_3_data['id'] = user.id;
        this.step_3_data['form_step_data'] = {'step_3_data': JSON.stringify(obj)};
        this.step_3_data['status'] = 1;
        this.step_3_data['complete_status'] = 0;
        this.form_service.partnership_form_data(this.step_3_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_3_data', data['metadata'].value);
          }
        })
      }  	
    }
  }
}
