import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PartnershipFormService} from '../partnership-form.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
declare var $:any;
@Component({
  selector: 'app-step-8',
  templateUrl: './step-8.component.html',
  styleUrls: ['./step-8.component.css']
})
export class Step8Component implements OnInit {
	content;
	show_div = false;
	options: Object = {
    imageInsertButtons: ['imageUpload'],
      imageOutputSize: true,
      imageUploadMethod: 'POST',
      imageUploadURL: environment.apiUrl + 'api/imageuploadpage',
    placeholderText: 'Edit Your Content Here!',
  }
  step_8_images =[];
  step_8_data = {};

  //read mode
  read_mode=false;
  constructor(private form_service:PartnershipFormService, private loader:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
  	if(localStorage.getItem('step_8_data')){
  		this.step_8_images = JSON.parse(localStorage.getItem('step_8_data'));
	  	// this.make_a4();
  	}
    // this.make_a4();
  }
  step_8_upload(event){
    this.loader.show();
    let files = event.target.files;
    let file = files[0];
    let formData = new FormData();
    formData.append('file',file,file.name);
    this.form_service.image_upload(formData).subscribe((data)=>{
      if(data.status){
        this.step_8_images.push(data.link);
        this.loader.hide();
      }
      else{
        alert('error while uploading image');
      }
      // this.make_a4();
    })
  }
  step_8_form_submit(){
    if(!this.read_mode){
      if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_8_data['form_id'] = form_id;
        }
        let user = JSON.parse(localStorage.getItem('user'));
        this.step_8_data['id'] = user.id;
        this.step_8_data['form_step_data'] = {'step_8_data': JSON.stringify(this.step_8_images)};
        this.step_8_data['status'] = 1;
        this.step_8_data['complete_status'] = 0;
        this.form_service.partnership_form_data(this.step_8_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_8_data', data['metadata'].value);
          }
        })
      }
    }
  }
  delete_image(i){
    this.step_8_images.splice(i,1);
  }

  make_a4(){
    var max_pages = 100;
    var page_count = 0;

    

    function snipMe() {
      console.log("here ere");
      page_count++;
      if (page_count > max_pages) {
        return;
      }
      console.log(typeof(this),'from function');
      var long = $(this)[0].scrollHeight - 842;
      var children = $(this).children().toArray();
      var removed = [];
      while (long > 0 && children.length > 0) {
        var child = children.pop();
        $(child).detach();
        removed.unshift(child);
        long = $(this)[0].scrollHeight - Math.ceil($(this).innerHeight());
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
        console.log(this,'form calling')
        snipMe.call(this);
      });
    });
  }
}
