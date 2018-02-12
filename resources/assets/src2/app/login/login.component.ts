import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {LoginserviceService} from '../loginservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
currentUser;
  constructor(private router:Router,private location:Location,private service:LoginserviceService) { }

  ngOnInit() {
  	if(localStorage.getItem('user')){
      this.service.token_check(1).subscribe((data)=>{
        if(data['userdata'].usermeta[0].role == 1){
          this.router.navigateByUrl('/admin-tools');
        }
        else if(data['userdata'].usermeta[0].role == 2){
          window.location.href = "/";
        }
      })

    }
  }

}
