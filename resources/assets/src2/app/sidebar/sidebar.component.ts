import { Component, OnInit, HostListener } from '@angular/core';
import { Router} from '@angular/router';
import {Location} from '@angular/common';
import {PartnershipFormService} from '../FormBuilder/partnership-form.service';
import {LoginserviceService} from '../loginservice.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
onResize(event){
   this.window_width = event.target.innerWidth;
}
  currentUser;
  showhidenav:boolean = false;
  rotate:boolean = false;
  rotate1:boolean = false;
  window_width:any;

  constructor(private router:Router, private location:Location,private service:LoginserviceService,private formService:PartnershipFormService) { }

  ngOnInit() {
    this.window_width = window.innerWidth;
  	if(localStorage.getItem('user')){
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      //checking if login token is still valid and which user is logged in
      this.service.token_check(1).subscribe((data)=>{
        if(data['userdata'].usermeta[0].role == 1){
          this.router.navigateByUrl('/admin-tools');
        }
        else if(data['userdata'].usermeta[0].role == 2){
          this.service.notification.notification_status = true;
          this.service.notification.action_status = false;
          this.service.notification.notification_message = "You are not admin! Please login as Admin.";
          window.setTimeout(() => {
            this.service.notification.notification_status = false;
            this.service.notification.action_status = false;
            this.service.notification.notification_message='';
            window.location.href = "/traders";
          }, 2500);
        }
      },(err)=>{
          this.service.notification.notification_status = true;
          this.service.notification.action_status = false;
          this.service.notification.notification_message = err;
          window.setTimeout(() => {
            this.service.notification.notification_status = false;
            this.service.notification.action_status = false;
            this.service.notification.notification_message='';
            this.logout();
          }, 2500);
        }
      )
    }
}

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }


test(){
  console.log(this.showhidenav);
    this.showhidenav = !this.showhidenav;
  }


rotation(){
   this.rotate = !this.rotate;
  }
  rotation1(){
   this.rotate1 = !this.rotate1;
  }


}
