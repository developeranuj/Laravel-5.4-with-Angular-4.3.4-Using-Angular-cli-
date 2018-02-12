import { Component, OnInit } from '@angular/core';
import {PartnershipFormService} from '../partnership-form.service';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
export class Step1Component implements OnInit {
	
  form_id;
  partnership_form=[];

  step_1_heading = "Trader Residential Solutions  Proposal";
	step_1_supporting_partners_heading = "Supporting partners";
  step_1_data = {};
  updating = false;

  default_draft=false;

  //read mode
  read_mode=false;
  //revise mode
  revise_mode=false;
  constructor(private router:Router,private form_service:PartnershipFormService, private route:ActivatedRoute) {
   }

  ngOnInit() {
    //for revising form
    if(localStorage.getItem('revising')=='1'){
      this.revise_mode=true;
    }
    // for read only
    if(localStorage.getItem('read_mode')=='1'){
      console.log(localStorage.getItem('read_mode'))
      this.read_mode = true;
    }
    //if revising form
    if(this.revise_mode){
      this.form_service.getpublishedform().subscribe((data)=>{
        console.log(data,'published form');
        this.partnership_form = data.formdata;
          localStorage.setItem('active_form_id',this.partnership_form['form_id']);
          // setting localStorage with fetched data
          this.partnership_form['form_meta'].forEach(function(value){
            localStorage.setItem(value.key,value.value);
          });
          if(localStorage.getItem('step_1_data')){
            var temp = JSON.parse(localStorage.getItem('step_1_data'));
            this.step_1_heading = temp.step_1_heading;
            this.step_1_supporting_partners_heading = temp.step_1_supporting_partners_heading;
          }

        })
    }
    else{
      //fetching data if request for updating form
      this.route.params.subscribe(params=>{
        this.form_id = params['form_id'];
        if(this.form_id){
          // setting updating variable true
          this.updating = true;

          this.form_service.getForm(this.form_id).subscribe((data)=>{
            this.partnership_form = data.formdata;
              localStorage.setItem('active_form_id',this.form_id);
            // setting localStorage with fetched data
            this.partnership_form['form_meta'].forEach(function(value){
              localStorage.setItem(value.key,value.value);
            });
          	if(localStorage.getItem('step_1_data')){
          		var temp = JSON.parse(localStorage.getItem('step_1_data'));
          		this.step_1_heading = temp.step_1_heading;
          		this.step_1_supporting_partners_heading = temp.step_1_supporting_partners_heading;
          	}
          })
        }
      })
    }
  }

  step_1_form_submit(obj){
    if(!this.read_mode){
      if(localStorage.getItem('user')){
        if(localStorage.getItem('active_form_id')){
          let form_id = localStorage.getItem('active_form_id');
          this.step_1_data['form_id'] = form_id;
        }
        let user = JSON.parse(localStorage.getItem('user'));
        this.step_1_data['id'] = user.id;
        this.step_1_data['form_step_data'] = {'step_1_data': JSON.stringify(obj)};
        this.step_1_data['status'] = 1;
        this.form_service.partnership_form_data(this.step_1_data).subscribe((data)=>{
          if(data.status){
            localStorage.setItem('step_1_data',data['metadata'].value);
            localStorage.setItem('active_form_id',data.formdata.form_id);
            if(this.updating){
              //when updating use this path
              this.router.navigate(['../../step-2'],{relativeTo:this.route});
            }
            else{
              //when creating new draft form
              this.router.navigate(['../step-2/'],{relativeTo:this.route});
            }
          }
        })
      }
    }
    
  }
  next_step(){
    console.log(this.form_id);
    if(this.form_id){
      this.router.navigate(['../../step-2/'],{relativeTo:this.route});
    }
    else{
      this.router.navigate(['../step-2/'],{relativeTo:this.route});
    }
  }
}
