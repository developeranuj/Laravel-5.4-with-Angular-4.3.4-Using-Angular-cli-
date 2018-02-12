import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PartnershipFormService} from '../partnership-form.service';
import {Router,ActivatedRoute} from  '@angular/router';
import * as swal  from 'sweetalert';
@Component({
  selector: 'app-step-15',
  templateUrl: './step-15.component.html',
  styleUrls: ['./step-15.component.css']
})
export class Step15Component implements OnInit {

	options: Object = {
    imageInsertButtons: ['imageUpload'],
      imageOutputSize: true,
      imageUploadMethod: 'POST',
      imageUploadURL: environment.apiUrl + 'api/imageuploadpage',
    placeholderText: 'Edit Your Content Here!',
  }
	step_15_heading_1_content ='';
  step_15_data = {};
  //read mode
  read_mode=false;
  constructor(private rotue:ActivatedRoute,private router:Router,private form_service:PartnershipFormService) { }

  ngOnInit() {
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
  	if(localStorage.getItem('step_15_data')){
  		this.step_15_heading_1_content = JSON.parse(localStorage.getItem('step_15_data'));

  	}
  }
  step_15_form_submit(obj){
    if(!this.read_mode){
    	if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_15_data['form_id'] = form_id;
        }
        // let temp = {};
        // temp['step_15_heading_1_content'] = this.step_15_heading_1_content; 
        let user = JSON.parse(localStorage.getItem('user'));
        this.step_15_data['id'] = user.id;
        this.step_15_data['form_step_data'] = {'step_15_data': JSON.stringify(this.step_15_heading_1_content)};
        this.step_15_data['status'] = 1;
        this.step_15_data['complete_status'] = 1;
        this.form_service.partnership_form_data(this.step_15_data).subscribe((data)=>{
          if(data.status){
            if(!(localStorage.getItem('active_form_id'))){
              localStorage.setItem('active_form_id',data.formdata.form_id);
            }
            localStorage.setItem('step_15_data', data['metadata'].value);
          }
        })
      }
    }
  }
  create_form(obj){
    var temp = localStorage.getItem('user');
    localStorage.clear();
    localStorage.setItem('user',temp);
    swal("Form created successfully.").then((value)=>{
     this.router.navigate(['../'],{relativeTo:this.rotue});
    });
  }
}
