

import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router'; //--- ==== import for routing

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
    public canActivate() {
    
        let loggedinUser = localStorage.getItem('user');
        if(loggedinUser){
            return true;
        }else{  
            this.router.navigate(['/traders']);
            return false;
        }      
   }
    
}