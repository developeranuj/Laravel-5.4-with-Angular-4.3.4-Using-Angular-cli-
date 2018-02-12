import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(private service:LoginserviceService) { }

  ngOnInit() {
  	
  }

}
