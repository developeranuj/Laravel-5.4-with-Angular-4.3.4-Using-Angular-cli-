import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PartnershipFormService} from '../partnership-form.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
@Component({
  selector: 'app-step-9',
  templateUrl: './step-9.component.html',
  styleUrls: ['./step-9.component.css']
})
export class Step9Component implements OnInit {

	options: Object = {
    imageInsertButtons: ['imageUpload'],
      imageOutputSize: true,
      imageUploadMethod: 'POST',
      imageUploadURL: environment.apiUrl + 'api/imageuploadpage',
    placeholderText: 'Edit Your Content Here!',
  }
  step_9_images = [];
	step_9_heading_1_content ='';
  step_9_heading_2_content ='';
  step_9_data = {};

  //read mode
  read_mode=false;
  constructor(private form_service:PartnershipFormService, private loader:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
  	if(localStorage.getItem('step_9_data')){
      var temp = JSON.parse(localStorage.getItem('step_9_data'));
      this.step_9_heading_1_content = temp.step_9_heading_1_content;
      this.step_9_heading_2_content = temp.step_9_heading_2_content;
      this.step_9_images = temp.step_9_images;
  	}
  }
  step_9_form_submit(obj){
    if(!this.read_mode){
      if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_9_data['form_id'] = form_id;
        }
        let user = JSON.parse(localStorage.getItem('user'));
        var temp = {};
        temp['step_9_heading_1_content'] = this.step_9_heading_1_content; 
        temp['step_9_heading_2_content'] = this.step_9_heading_2_content; 
        temp['step_9_images'] = this.step_9_images;
        this.step_9_data['id'] = user.id;
        this.step_9_data['form_step_data'] = {'step_9_data': JSON.stringify(temp)};
        this.step_9_data['status'] = 1;
        this.step_9_data['complete_status'] = 0;
        this.form_service.partnership_form_data(this.step_9_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_9_data', data['metadata'].value);
          }
        })
      }
    }
  }
  step_9_upload(event){
    this.loader.show();
    let files = event.target.files;
    let file = files[0];
    let formData = new FormData();
    formData.append('file',file,file.name);
    this.form_service.image_upload(formData).subscribe((data)=>{
      if(data.status){
        this.step_9_images.push(data.link);
        this.loader.hide();
      }
      else{
        alert('error while uploading image');
      }
    })
  }
  delete_image(i){
    this.step_9_images.splice(i,1);
  }
}
