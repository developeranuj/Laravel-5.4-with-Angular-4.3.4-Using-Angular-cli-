import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';

import {Router,ActivatedRoute} from '@angular/router';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

	id:any;
    userdata:any;
    // for notification message
    notification_status = false;
    action_status;
    notification_message;
  constructor(private service:LoginserviceService,private router:Router , private route:ActivatedRoute, private loader:Ng4LoadingSpinnerService) { }

  updateuser(data,form){
    this.loader.show();
    data['id'] = this.id;
    this.service.updateuser(data).subscribe((data) => {
      if(data.status){
        this.loader.hide();
        this.notification_status = true;
        form.resetForm();
  		 	this.action_status = true;
  		 	this.notification_message = data.message;
  		 	window.setTimeout(() => {
  		 		this.notification_status = false;
  		 		this.router.navigate(['../'],{relativeTo:this.route});
  		    }, 1500); 
  		}
  		else{
  			this.notification_status = true;
  		 	this.action_status = false;
  		 	this.notification_message = data.message;
  		}

  	});

  }

  ngOnInit() {
  	 this.id  = this.route.snapshot.params.id;
  	 
  		this.service.getsingleuser(this.id).subscribe((data)=>{
     if(data.status){
     
      this.userdata = data.userdata;
     }
  	}) ;
  }

  // reset password
  reset_password(x){
    this.loader.show();
    var obj={email:x};
    this.service.reset_password(obj).subscribe((data)=>{
      console.log(data)
      if(data.status){
        this.loader.hide();
        // setting Notification in service
        this.service.notification.notification_status = true;
        this.service.notification.action_status = data.status;
        this.service.notification.notification_message = data.message;

        // redirect to all users page
        this.router.navigate(['../'],{relativeTo:this.route});
       }
       else{
         this.loader.hide();
        this.service.notification.notification_status = true;
        this.service.notification.action_status = data.status;
        this.service.notification.notification_message = data.message;

        // redirect to all users page
        this.router.navigate(['../'],{relativeTo:this.route});
         
       }
    },(err)=>{
      this.loader.hide();
        this.service.notification.notification_status = true;
        this.service.notification.action_status = false;
        this.service.notification.notification_message = err;
        window.setTimeout(() => {
          this.service.notification.notification_status = false;
          this.service.notification.action_status = false;
          this.service.notification.notification_message='';
        }, 2500);
      }
    )
  }

}
