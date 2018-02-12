import { Component, OnInit } from '@angular/core';
import {BuilderserviceService} from '../../builderservice.service';
import {LoginserviceService} from '../../loginservice.service';
@Component({
  selector: 'app-builder-all',
  templateUrl: './builder-all.component.html',
  styleUrls: ['./builder-all.component.css']
})
export class BuilderAllComponent implements OnInit {
	builders;

  constructor(private service:BuilderserviceService,private loginService:LoginserviceService) { }

  ngOnInit() {
  	this.service.getClients().subscribe((data)=>{
  		if(data.status){
  	    this.builders = data.getclients;
  		}
  		else{
  			alert('Error during fetching builders');
  		}
  	})
    if(this.loginService.notification.notification_status){
      window.setTimeout(()=>{
        this.loginService.notification.notification_status=false;
        this.loginService.notification.notification_message='';
      },2500);
    }
  }

  delete_builder(id,i){
    console.log("in function");
    this.service.deleteBuilder(id).subscribe((data)=>{
      console.log(data)
      if(data.status){
        this.builders.splice(i,1);
        // setting Notification
          this.loginService.notification.notification_status=true;
          this.loginService.notification.action_status = true;
          this.loginService.notification.notification_message = 'Builder deleted successfully.';

          window.setTimeout(()=>{
            this.loginService.notification.notification_status=false;
             this.loginService.notification.notification_message='';
          },2500);
      }
    })
  }

}
