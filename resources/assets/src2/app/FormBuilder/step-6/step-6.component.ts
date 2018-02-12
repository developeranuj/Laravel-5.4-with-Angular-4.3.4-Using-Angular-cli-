import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PartnershipFormService} from '../partnership-form.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
@Component({
  selector: 'app-step-6',
  templateUrl: './step-6.component.html',
  styleUrls: ['./step-6.component.css']
})
export class Step6Component implements OnInit {
	options: Object = {
		imageInsertButtons: ['imageUpload'],
      imageOutputSize: true,
      imageUploadMethod: 'POST',
      imageUploadURL: environment.apiUrl + 'api/imageuploadpage',
		placeholderText: 'Edit Your Content Here!',
	}
  step_6_heading_1_content ='';
  step_6_images = [];
  step_6_data = {};

  //read mode
  read_mode=false;
  constructor(private form_service:PartnershipFormService, private loader:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
  	if(localStorage.getItem('step_6_data')){
      var temp = JSON.parse(localStorage.getItem('step_6_data'));
      this.step_6_heading_1_content = temp.step_6_heading_1_content;
      this.step_6_images = temp.step_6_images;
  	}
  }
  step_6_form_submit(obj){
    if(!this.read_mode){
      if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_6_data['form_id'] = form_id;
        }
        let temp = {};
        temp['step_6_heading_1_content'] = this.step_6_heading_1_content; 
        temp['step_6_images'] = this.step_6_images; 
        let user = JSON.parse(localStorage.getItem('user'));
        this.step_6_data['id'] = user.id;
        this.step_6_data['form_step_data'] = {'step_6_data': JSON.stringify(temp)};
        this.step_6_data['status'] = 1;
        this.step_6_data['complete_status'] = 0;
        this.form_service.partnership_form_data(this.step_6_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_6_data', data['metadata'].value);
          }
        })
      }
    }
  }
  step_6_image_upload(event){
    this.loader.show();
    let files = event.target.files;
    let file = files[0];
    let formData = new FormData();
    formData.append('file',file,file.name);
    this.form_service.image_upload(formData).subscribe((data)=>{
      if(data.status){
        this.step_6_images.push(data.link);
        this.loader.hide();
      }
      else{
        alert('error while uploading image');
      }
    })
  }
  delete_image(i){
    this.step_6_images.splice(i,1);
  }
}
