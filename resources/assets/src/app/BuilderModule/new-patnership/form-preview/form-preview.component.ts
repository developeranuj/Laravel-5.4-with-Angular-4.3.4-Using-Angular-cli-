import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import {NewpartnershipService} from '../newpartnership.service';
import {Router,ActivatedRoute} from '@angular/router';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {
	@ViewChild ('data') e1:ElementRef;
	test_variable;
  constructor() { }

  ngOnInit() {

      let step_15 = JSON.parse(localStorage.getItem("steps_html"));

    this.test_variable = step_15;
  }

  print(){
  	let pdf = new jsPDF();
     

        let options = {
            pagesplit: true

        };
        pdf.addHTML(this.e1.nativeElement, 0, 0, options, () => {
            pdf.save("test.pdf");
        
        });
  }
}
