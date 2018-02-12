import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  erroStatus;
  errMsg;
  constructor(private service:LoginserviceService) { }

  ngOnInit() {
  }

  forgot(obj){
  	this.service.forgotPassword(obj).subscribe((data)=>{
  		this.erroStatus = true;
      this.errMsg = data.message;
  	})
  }
}
