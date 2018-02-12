import { Component, OnInit, HostListener } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common'
import {BuilderContainerComponent} from '../builder-container/builder-container.component';
import {LoginserviceService} from '../../loginservice.service';
import * as swal  from 'sweetalert';
@Component({
  selector: 'app-builder-sidebar',
  templateUrl: './builder-sidebar.component.html',
  styleUrls: ['./builder-sidebar.component.css']
})
export class BuilderSidebarComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.window_width = event.target.innerWidth;
  }
	currentUser;
  rotate:boolean= false;
  rotate1:boolean= false;
  rotate2:boolean= false;
	showhidenav:boolean = false;
  window_width:any;

  constructor(private location:Location,private router:Router, private service:LoginserviceService) { }

  ngOnInit() {
    this.window_width = window.innerWidth;
    //checking if login token is still valid or not.
    this.service.token_check(1).subscribe((data)=>{
      if(data['userdata'].password_status == 0){
          this.router.navigate(['/changePassword'])
        }
      this.currentUser = data['userdata'];
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

   getpartnerform(){
     this.service.getpublishedform().subscribe((data) => {
       if(data.formdata == null)
       {
         swal("No Form is published Yet.")
       }
       else{
         this.router.navigate(['/partnership/create/']);
       }
     });
  }

  logout(){
    var x = 1 //dummy variable
    this.service.logout(x).subscribe((data)=>{
              localStorage.clear();
          this.router.navigateByUrl('/traders');
    },(err)=>{
          localStorage.clear();
        	this.router.navigateByUrl('/traders');
      }
    )
  }

    test(){


    this.showhidenav = !this.showhidenav;
  }

  rotation(){
   this.rotate = !this.rotate;
  }
  rotation1(){
   this.rotate1 = !this.rotate1;
  }
  rotation2(){
   this.rotate2 = !this.rotate2;
  }


}
