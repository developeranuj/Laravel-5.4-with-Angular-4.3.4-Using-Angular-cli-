import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	currentUser;
  constructor( private router:Router) { }

  ngOnInit() {
  	if(localStorage.getItem('user')){
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
  }
  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

}
