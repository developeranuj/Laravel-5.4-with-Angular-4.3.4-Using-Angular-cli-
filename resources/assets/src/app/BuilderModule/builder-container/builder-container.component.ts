import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginserviceService} from '../../loginservice.service';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-builder-container',
  templateUrl: './builder-container.component.html',
  styleUrls: ['./builder-container.component.css']
})
export class BuilderContainerComponent implements OnInit {

  
  constructor(private router:Router, private service:LoginserviceService) { 

   
  }

  ngOnInit() {
    
  }


}
