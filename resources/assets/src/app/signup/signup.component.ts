import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  erroStatus = false;
  errMsg;
  constructor(private service:LoginserviceService) { }

  ngOnInit() {
  }
  register(obj){
    console.log(obj,'data send to create builder route');
    this.service.register(obj).subscribe((data)=>{
      if(data.status){
        this.erroStatus = true;
        this.errMsg = 'Account created successfully.'
      }
      else{
        this.erroStatus = true;
        this.errMsg = 'Error encountered while creating account';
      }
      console.log(data,'reply from server');
    })
  }
}
