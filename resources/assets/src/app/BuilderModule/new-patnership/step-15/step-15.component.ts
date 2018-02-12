import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {LoginserviceService} from '../../../loginservice.service';
import {Router,ActivatedRoute} from '@angular/router';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-step-15',
  templateUrl: './step-15.component.html',
  styleUrls: ['./step-15.component.css']
})
export class Step15Component implements OnInit {
  @ViewChild ('data') e1:ElementRef;
  step_15_data;
  pdf_content = '';
  // console.log()

  formData:any = {};
  constructor(private router:Router,private route:ActivatedRoute,private service:NewpartnershipService, private loginService: LoginserviceService) { }

  pdf(){

    let step_15 = JSON.parse(localStorage.getItem("steps_html"));
     let temp = document.getElementById("content").innerHTML;
      step_15 = step_15 + temp;

    localStorage.setItem("steps_html",JSON.stringify(step_15));
    this.pdf_content = step_15;
        
        // this.router.navigate(['../formpreview'], {relativeTo : this.route });
     let pdf = new jsPDF("1", "pt", "a4");
     

        let options = {
            pagesplit: true

        };
        pdf.addHTML(this.e1.nativeElement, 0, 0, options, () => {
            pdf.save("test.pdf");

            //submit the saved form
            this.service.submitForm(this.formData).subscribe((data) => {
            if(data.status){
              this.loginService.notification.notification_status = true;
              this.loginService.notification.action_status = data.status;
              this.loginService.notification.notification_message = data.message;
              this.loginService.clean_localstorage();
              this.router.navigate(['/']);
            }
            else{
               window.setTimeout(() => {
                this.loginService.notification.notification_status = false;
                this.loginService.notification.action_status = false;
                this.loginService.notification.notification_message='';
              }, 2500);
            }
          });
        });
        
  }

  ngOnInit() {
    if(localStorage.getItem('formData')){
      this.formData = JSON.parse(localStorage.getItem('formData'));
    }
  	this.service.getpublishedform().subscribe((data) => {
      console.log(data);

      this.step_15_data = JSON.parse(data.formdata.form_meta[14].value);
      console.log(this.step_15_data);
     });
  }

}
