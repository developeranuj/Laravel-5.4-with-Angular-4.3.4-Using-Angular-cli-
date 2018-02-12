import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import {Router} from '@angular/router';
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
  saleuser;
  constructor(private service:LoginserviceService, private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('saleuser')){
      this.saleuser = JSON.parse(localStorage.getItem('saleuser'));
    }
  }
  
  login(obj){
  	this.service.login(obj).subscribe((data)=>{
      if(data.status){
        this.erroStatus = false;
        if(data.token){
          console.log(data);
          localStorage.setItem('user_token',data.token);
          this.currentUser = data.userdata;
          this.currentUser['user_token'] = data.token; 
          console.log(this.currentUser);
          localStorage.setItem('user',JSON.stringify(this.currentUser));
            this.router.navigateByUrl('/');
        }
      }
      else{
        this.erroStatus = true;
        this.errMsg = data.error;
      }
  	})
  }
}