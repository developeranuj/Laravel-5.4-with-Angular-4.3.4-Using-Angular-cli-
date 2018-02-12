import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../../loginservice.service';
@Component({
  selector: 'app-new-patnership',
  templateUrl: './new-patnership.component.html',
  styleUrls: ['./new-patnership.component.css']
})
export class NewPatnershipComponent implements OnInit {

  
	

  constructor(private service:LoginserviceService) { }

  ngOnInit() {
  }


 

}
