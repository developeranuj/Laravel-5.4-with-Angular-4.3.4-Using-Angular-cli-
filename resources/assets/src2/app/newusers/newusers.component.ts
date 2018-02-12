import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
@Component({
  selector: 'app-newusers',
  templateUrl: './newusers.component.html',
  styleUrls: ['./newusers.component.css']
})
export class NewusersComponent implements OnInit {

  identification =
    [
    { role: 1, name: 'Admin'},
    { role: 2, name: 'Sales'}
    ];

    // for notification message
    notification_status = false;
    action_status;
    notification_message;

  constructor(private service:LoginserviceService, private router:Router, private route:ActivatedRoute, private loader:Ng4LoadingSpinnerService) { }
   
  createUser(obj,form){
      this.loader.show();
      this.service.createUser(obj).subscribe((data)=>{
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
         this.service.notification.notification_status = true;
        this.service.notification.action_status = data.status;
        this.service.notification.notification_message = data.message;
        window.setTimeout(() => {
          this.service.notification.notification_status = false;
          this.service.notification.action_status = false;
          this.service.notification.notification_message='';
        }, 2500);
       }

    });
  }

   ngOnInit() {
       
  }

}
