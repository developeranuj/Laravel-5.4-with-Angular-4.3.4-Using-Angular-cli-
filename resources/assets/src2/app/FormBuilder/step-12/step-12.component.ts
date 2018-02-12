import { Component, OnInit } from '@angular/core';
import {PartnershipFormService} from '../partnership-form.service';
@Component({
  selector: 'app-step-12',
  templateUrl: './step-12.component.html',
  styleUrls: ['./step-12.component.css']
})
export class Step12Component implements OnInit {
	step_12_heading_1_content;
	step_12_data = {};
  //read mode
  read_mode=false;
  constructor(private form_service:PartnershipFormService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
  	if(localStorage.getItem('step_12_data')){
  		var temp = JSON.parse(localStorage.getItem('step_12_data'));
      this.step_12_heading_1_content = temp.step_12_heading_1_content;
  	}
  }
  
  step_12_form_submit(obj){
    if(!this.read_mode){
    	if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_12_data['form_id'] = form_id;
        }
        let user = JSON.parse(localStorage.getItem('user'));
        let temp = {};
        temp['step_12_heading_1_content'] = this.step_12_heading_1_content;
        this.step_12_data['id'] = user.id;
        this.step_12_data['form_step_data'] = {'step_12_data': JSON.stringify(temp)};
        this.step_12_data['status'] = 1;
        this.step_12_data['complete_status'] = 0;
        this.form_service.partnership_form_data(this.step_12_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_12_data', data['metadata'].value);
          }
        })
      }
    }
  }
}
