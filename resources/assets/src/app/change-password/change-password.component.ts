import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private service:LoginserviceService,private route:ActivatedRoute,private router:Router) { }
  sub
  token;
  display = true;
  erroStatus = false;
  errMsg;
  successStatus;
  successMessage;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.token = params['token'];
       console.log(this.token);
     });
    if(this.service.notification.notification_status){
       
    }
  }
  changePassword(obj){
    
    var user = JSON.parse(localStorage.getItem('user'));
    let id  = user.id ;
    if(obj.newpassword ===obj.confirmpassword){
      obj['id'] = id;
      this.service.changeUserPassword(obj).subscribe((data)=>{
    		if(data.status){
          this.service.notification.notification_status = true;
          this.service.notification.action_status = data.status;
          this.service.notification.notification_message = data.message;
        }
        else{
          this.service.notification.notification_status = true;
          this.service.notification.action_status = data.status;
          this.service.notification.notification_message = data.message;
        }
        window.setTimeout(() => {
          this.service.notification.notification_status = false;
          this.service.notification.action_status = false;
          this.service.notification.notification_message='';
        }, 2500);
    	})
    }
  }
}


