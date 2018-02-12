import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PartnershipFormService} from '../partnership-form.service';

declare var $:any;
@Component({
  selector: 'app-step-11',
  templateUrl: './step-11.component.html',
  styleUrls: ['./step-11.component.css']
})
export class Step11Component implements OnInit {
content;
	show_div = false;
	options: Object = {
    imageInsertButtons: ['imageUpload'],
      imageOutputSize: true,
      imageUploadMethod: 'POST',
      imageUploadURL: environment.apiUrl + 'api/imageuploadpage',
    placeholderText: 'Edit Your Content Here!',
  }
	step_11_heading_1_content;
  step_11_data = {};
  //read mode
  read_mode=false;
  constructor(private form_service:PartnershipFormService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
  	if(localStorage.getItem('step_11_data')){
  		var temp = JSON.parse(localStorage.getItem('step_11_data'));
      this.step_11_heading_1_content = temp.step_11_heading_1_content;
  	}

  }
  step_11_form_submit(obj){
    if(!this.read_mode){
    	if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_11_data['form_id'] = form_id;
        }
        
        let user = JSON.parse(localStorage.getItem('user'));

        let temp = {};
        temp['step_11_heading_1_content'] = this.step_11_heading_1_content; 

        this.step_11_data['id'] = user.id;
        this.step_11_data['form_step_data'] = {'step_11_data': JSON.stringify(temp)};
        this.step_11_data['status'] = 1;
        this.step_11_data['complete_status']= 0;
        this.form_service.partnership_form_data(this.step_11_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_11_data', data['metadata'].value);
          }
        })
      }
    }
  }

  make_a4(){
    var content = $('.to_be_removed').contents();
    $('.to_be_removed').replaceWith(content);
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
        var a4 = $('<div class="page"><div class="jumbotron topBar" style="background-color: #1e1e1e;text-align: right;border-radius: 0;margin-bottom: 0px;max-height: 30vh;padding: 20px 10px;"><img src="images/logo.svg"></div><hr class="bottomBar" style="margin: 0;background-color: #c5e74e;padding: 8px;"></div>');
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
  edit_form(){
    $('p').remove();
    $('.page').append('<p class="to_be_removed" [innerHtml]="step_11_heading_1_content"></p>');
  }
}
