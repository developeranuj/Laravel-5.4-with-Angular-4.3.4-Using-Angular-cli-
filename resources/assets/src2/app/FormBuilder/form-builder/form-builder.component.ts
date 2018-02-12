import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
	builder_logo_status;
	edit_form = true;
  constructor() { }
  @ViewChild('one') d1:ElementRef;
  ngOnInit() {
  }
  save_form(){
  	this.edit_form = false;
  	localStorage.setItem('form',this.d1.nativeElement);
  	console.log(this.d1.nativeElement);
  }
}
