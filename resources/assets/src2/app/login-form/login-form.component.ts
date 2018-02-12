import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  erroStatus=false;
  errMsg;
  currentUser;
  token;
  constructor(private cookie:CookieService,private service:LoginserviceService, private router:Router) { }

  ngOnInit() {

  }
  login(obj){
  	this.service.login(obj).subscribe((data)=>{
      if(data.status){
        this.erroStatus = false;
        if(data.token){
          localStorage.setItem('user_token',data.token);
          this.currentUser = data.userdata;
          this.currentUser['user_token'] = data.token;
          if(data.userdata.usermeta[0].role ==2){
            this.erroStatus = true;
            this.errMsg = "Invalid credentials";
          }
          else if(data.userdata.usermeta[0].role ==1){
            localStorage.setItem('user',JSON.stringify(this.currentUser));
            // window.location.href="/";
            this.router.navigateByUrl('/admin-tools');
          }
        }
      }
      else{
        this.erroStatus = true;
        this.errMsg = data.error;
      }
  	})
  }
}
