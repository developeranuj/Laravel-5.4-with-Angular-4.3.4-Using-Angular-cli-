import { Component, OnInit } from '@angular/core';
import {PartnershipFormService} from '../partnership-form.service';
import {Router,ActivatedRoute} from  '@angular/router';

//for alert box
import swal from 'sweetalert2'

@Component({
  selector: 'app-partnership-panel',
  templateUrl: './partnership-panel.component.html',
  styleUrls: ['./partnership-panel.component.css']
})
export class PartnershipPanelComponent implements OnInit {
	form_data = [];
  form_status;
  no_drafts=0;

  constructor(private form_service:PartnershipFormService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
  	this.form_service.getallForms().subscribe((data)=>{
  		if(data.status){
  			this.form_data = data.formdata;
        this.form_data.forEach((item)=>{
          if(!item.form_data.default_draft){
            if(item.form_data.status==1){
              this.no_drafts++;
            }
          }
        })
        console.log(this.form_data);
  		}
  	})
    this.form_service.clean_localstorage();
  }

  publish(id){

    swal({
        title: "Publish Form",
        text: "Please confirm to publish the partnership agreement",
        type:"warning",
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Publish'
      })
      .then((delete_status) => {
        if (delete_status.value) {
          var temp={};
          temp['form_id'] = id;
          temp['status'] = 0;
          this.form_service.publish_form(temp).subscribe((data)=>{
            if(data.status){
              this.form_data = data.formdata;
              swal("Done!", data.message, "success");
              this.form_data.forEach((item)=>{
                if(!item.form_data.default_draft){
                  if(item.form_data.status==1){
                    this.no_drafts++;
                  }
                }
              })
            }
            else{
              swal("Not Published", data.message, "warning");
            }
          })
        }
      });

  }
  delete_form(form, index){
    if(form.status == 0){
      swal({
        title: "This form is currently published!",
        text: "If you will delete this one, you'll have to publish another form.",
        type:"warning",
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
      })
      .then((delete_status) => {
        if (delete_status.value) {
          this.form_service.delete_form(form.form_id).subscribe((data)=>{
            if(data.status){
              swal("Form has been deleted successfully");
              this.form_data.splice(index,1);
              this.no_drafts--;       
            }
          })
        }
      });  
    }
    else{
      swal({
        title: "Are you sure",
        text: "Once deleted, you will not be able to recover this form.",
        type:"warning",
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
      })
      .then((delete_status) => {
        if (delete_status.value) {
          this.form_service.delete_form(form.form_id).subscribe((data)=>{
            if(data.status){
              swal("Form has been deleted successfully");
              this.form_data.splice(index,1);
              this.no_drafts--;
            }
          })
        }
      });
    }
  }
  clearForm(){
    var temp = localStorage.getItem('user');
    localStorage.clear();
    localStorage.setItem('user',temp);
    this.router.navigate(['step-1/'],{relativeTo:this.route});
  }
  read_form(){
    localStorage.setItem('read_mode','1');
  }

  revise_agreement(){
    localStorage.setItem('revising','1');
  }
}
