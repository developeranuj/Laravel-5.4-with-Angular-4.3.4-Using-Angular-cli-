import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {LoginserviceService} from '../loginservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
currentUser;
  constructor(private route:ActivatedRoute,private router:Router, private service: LoginserviceService) { }

  ngOnInit() {

    if(localStorage.getItem('user')){
      this.service.token_check(1).subscribe((data)=>{
          if(data['userdata'].password_status == 0){
            this.router.navigate(['/changePassword'])
          }
          else{
            this.router.navigate(['../']);
          }
      })
    }
  }

}
