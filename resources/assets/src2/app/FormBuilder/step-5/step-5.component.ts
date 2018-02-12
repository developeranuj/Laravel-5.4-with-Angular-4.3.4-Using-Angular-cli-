import { Component, OnInit } from '@angular/core';
import {PartnershipFormService} from '../partnership-form.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
@Component({
  selector: 'app-step-5',
  templateUrl: './step-5.component.html',
  styleUrls: ['./step-5.component.css']
})
export class Step5Component implements OnInit {
	step_5_executive_content;
   step_5_image_url;
   step_5_data ={};

   //read mode
  read_mode=false;
  constructor(private form_service:PartnershipFormService, private loader:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }

  	if(localStorage.getItem('step_5_data')){
  		var temp = JSON.parse(localStorage.getItem('step_5_data'));
  		this.step_5_executive_content = temp.step_5_executive_content;
      this.step_5_image_url = temp.step_5_image_url;
  	}
  }

  step_5_form_submit(){
    if(!this.read_mode){
      this.step_5_data['step_5_executive_content'] = this.step_5_executive_content;
      this.step_5_data['step_5_image_url'] = this.step_5_image_url;
      if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_5_data['form_id'] = form_id;
        }
        let temp = {};
        temp['step_5_executive_content'] = this.step_5_executive_content; 
        temp['step_5_image_url'] = this.step_5_image_url; 
        let user = JSON.parse(localStorage.getItem('user'));
        this.step_5_data['id'] = user.id;
        this.step_5_data['form_step_data'] = {'step_5_data': JSON.stringify(temp)};
        this.step_5_data['status'] = 1;
        this.step_5_data['complete_status'] = 0;
        this.form_service.partnership_form_data(this.step_5_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_5_data', data['metadata'].value);
          }
        })
      }
    }
    
  }
  step_5_image_upload(event){
    this.loader.show();
    let files = event.target.files;
    let file = files[0];
    let formData = new FormData();
    formData.append('file',file,file.name);
    this.form_service.image_upload(formData).subscribe((data)=>{
      if(data.status){
        this.step_5_image_url = data.link;
        this.loader.hide();
      }
      else{
        alert('error while uploading image');
      }
    })
  }
  delete_image(){
    this.step_5_image_url = '';
  }
}
