import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';
import {PartnershipFormService} from '../partnership-form.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
declare var $:any;
@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.css']
})
export class Step2Component implements OnInit {
  step_2_images =[];
  step_2_data = {};
  //read mode
  read_mode=false;
  @ViewChild ('fileInput') file_input:ElementRef;
  constructor(private form_service:PartnershipFormService, private location:Location,private loader:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
    // fetching data from localStorage
    if(localStorage.getItem('step_2_data')){
      this.step_2_images = JSON.parse(localStorage.getItem('step_2_data'));
      this.make_a4();
    }
    this.make_a4();
  }
  step_2_form_submit(){
    if(!this.read_mode){
      if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_2_data['form_id'] = form_id;
        }
        let user = JSON.parse(localStorage.getItem('user'));
        this.step_2_data['id'] = user.id;
        this.step_2_data['form_step_data'] = {'step_2_data':JSON.stringify(this.step_2_images)};
        this.step_2_data['status'] = 1;
        this.step_2_data['complete_status'] = 0;
        this.form_service.partnership_form_data(this.step_2_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_2_data',data['metadata'].value);
          }
        })
      }
    }
  }
  chooseImage(){
    this.file_input.nativeElement.click();
    this.loader.show();
  }
  step_2_upload(event){
    let files = event.target.files;
    let file = files[0];
    let formData = new FormData();
    if(file.name){
      formData.append('file',file,file.name);
    }
    this.form_service.image_upload(formData).subscribe((data)=>{
      if(data.status){
        this.step_2_images.push(data.link);
        this.loader.hide();
      }
      else{
        alert('error while uploading image');
      }
      this.make_a4();
    })
  }
  delete_image(i){
    this.step_2_images.splice(i,1);
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
      console.log(children);
      var removed = [];
      while (long > 0 && children.length > 0) {
        var child = children.pop();
        $(child).detach();
        removed.unshift(child);
        long = $(this)[0].scrollHeight - 842;
      }
      if (removed.length > 0) {
        var a4 = $('<div class="page"></div>');
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
  goback(){
    this.location.back();
  }
  
}
