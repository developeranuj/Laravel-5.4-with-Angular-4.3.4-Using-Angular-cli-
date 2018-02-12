import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PartnershipFormService} from '../partnership-form.service';
@Component({
  selector: 'app-step-14',
  templateUrl: './step-14.component.html',
  styleUrls: ['./step-14.component.css']
})
export class Step14Component implements OnInit {
content;

	options: Object = {
    imageInsertButtons: ['imageUpload'],
      imageOutputSize: true,
      imageUploadMethod: 'POST',
      imageUploadURL: environment.apiUrl + 'api/imageuploadpage',
    placeholderText: 'Edit Your Content Here!',
  }
	step_14_heading_1_content ='';
  step_14_data = {};
  //read mode
  read_mode=false;
  constructor(private form_service:PartnershipFormService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
  	if(localStorage.getItem('step_14_data')){
  		this.step_14_heading_1_content = JSON.parse(localStorage.getItem('step_14_data'));
	  
  	}
  }
  step_14_form_submit(obj){
    if(!this.read_mode){
    	if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_14_data['form_id'] = form_id;
        }

        let user = JSON.parse(localStorage.getItem('user'));
        this.step_14_data['id'] = user.id;
        this.step_14_data['form_step_data'] = {'step_14_data': JSON.stringify(this.step_14_heading_1_content)};
        this.step_14_data['status'] = 1;
        this.step_14_data['complete_status'] = 0;
        this.form_service.partnership_form_data(this.step_14_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_14_data', data['metadata'].value);
          }
        })
      }
    }
  }

}
