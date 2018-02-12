import { Component, OnInit } from '@angular/core';
import {BuilderserviceService} from '../../builderservice.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-builders-overview',
  templateUrl: './builders-overview.component.html',
  styleUrls: ['./builders-overview.component.css']
})
export class BuildersOverviewComponent implements OnInit {
	client;
  contacts = [];
  constructor(private service:BuilderserviceService, private route:ActivatedRoute) { }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params=>{
      id = params['id'];
      this.service.getSingleClient(id).subscribe((data)=>{
        if (data.status) {
          this.client = data.getclient[0];
          this.contacts = this.client.client_contacts;
        }
      })
    })
  }

}
