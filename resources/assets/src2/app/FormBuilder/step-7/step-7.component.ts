import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PartnershipFormService} from '../partnership-form.service';
@Component({
  selector: 'app-step-7',
  templateUrl: './step-7.component.html',
  styleUrls: ['./step-7.component.css']
})
export class Step7Component implements OnInit {
  options: Object = {
    imageInsertButtons: ['imageUpload'],
      imageOutputSize: true,
      imageUploadMethod: 'POST',
      imageUploadURL: environment.apiUrl + 'api/imageuploadpage',
    placeholderText: 'Edit Your Content Here!',
  }
	step_7_heading_1_content='';
  step_7_data={};

  //read mode
  read_mode=false;
  constructor(private form_service :PartnershipFormService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
  	if(localStorage.getItem('step_7_data')){
      var temp = JSON.parse(localStorage.getItem('step_7_data'));
      console.log(temp);
      this.step_7_heading_1_content = temp;
  	}
  }
  step_7_form_submit(obj){
    if(!this.read_mode){
    	if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_7_data['form_id'] = form_id;
        }
        let user = JSON.parse(localStorage.getItem('user'));
        this.step_7_data['id'] = user.id;
        this.step_7_data['form_step_data'] = {'step_7_data': JSON.stringify(this.step_7_heading_1_content)};
        this.step_7_data['status'] = 1;
        this.step_7_data['complete_status'] = 0;
        this.form_service.partnership_form_data(this.step_7_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_7_data', data['metadata'].value);
          }
        })
      }
    }
  }
}
