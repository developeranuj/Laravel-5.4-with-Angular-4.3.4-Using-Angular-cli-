import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BuilderContainerComponent} from '../builder-container/builder-container.component';
import {LoginserviceService} from '../../loginservice.service';
@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.css']
})
export class BuilderHeaderComponent implements OnInit {


  constructor(private router:Router, private service:LoginserviceService) { }
  currentUser;
  ngOnInit() {
    if(localStorage.getItem('user')){
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
  }
  logout(){
    localStorage.removeItem('user');
  	this.router.navigateByUrl('/traders');
  }

}

