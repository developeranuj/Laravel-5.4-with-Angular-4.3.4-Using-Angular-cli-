import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from '../loginservice.service';
import {Router} from '@angular/router';
import {FilterPipe} from '../filter.pipe';
import swal from 'sweetalert2';
@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

	allusers;
  userdata;
  constructor(private service:LoginserviceService, private router:Router) { }

  actuser(data){
    var obj = {}
    obj['email'] = data;
    this.service.act_as_sales(obj).subscribe((data)=>{
      if(data.error){
        this.service.notification.notification_status=true;
        this.service.notification.notification_message="Your token is expired! Please login again to continue.";
        this.service.notification.action_status=false;
        window.setTimeout(()=>{
          this.service.notification.notification_status=false;
          this.service.notification.notification_message="";
          this.service.notification.action_status=false;
        },2500);
      }
      if(data.status){
        var user =JSON.parse(localStorage.getItem('user'));
        //using same admin token
        data.userdata['user_token']=user.user_token;
        localStorage.clear();
        localStorage.setItem('user',JSON.stringify(data.userdata));
        // redirect to front-end
        window.location.href="/";
      }
    },(err)=>{
        this.service.notification.notification_status = true;
        this.service.notification.action_status = false;
        this.service.notification.notification_message = err;
        window.setTimeout(() => {
          this.service.notification.notification_status = false;
          this.service.notification.action_status = false;
          this.service.notification.notification_message='';
        }, 2500);
      }
    )
  }

  deleteUser(data,i){
    swal({
        title: "Are you sure",
        type:"warning",
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
      })
      .then((delete_status) => {
        if (delete_status.value) {
          this.service.deleteuser(data).subscribe((data)=>{
           console.log(data);
           if(data.status){
             swal("User deleted successfully");
             this.allusers.splice(i,1);
           }
          })
        }
    });
  }

  ngOnInit() {
    //check for notification
    if(this.service.notification.notification_status){
       window.setTimeout(() => {
          this.service.notification.notification_status = false;
          this.service.notification.action_status = false;
          this.service.notification.notification_message='';
        }, 2500);
    }

  	this.service.getAllUsers().subscribe((data)=>{


  		if(data.status){

  			this.allusers= data.users;
  		}
  		else{
  			alert('Error during fetching users');
  		}
  	})

  }
  // filter by name
  filtered_data(event){
    console.log(event);
    console.log(this.allusers);
  }
  // sort data
  sort_data(event){
    if(event == 'ascending'){
      this.allusers.sort(function(a, b){
        var name_a = a['name'].toLowerCase();
        var name_b = b['name'].toLowerCase();
        if(name_a < name_b){
            return -1 ;
        }
        else if( name_a > name_b){
            return 1 ;
        }
        else{
            return 0;
        }
      });
    }
    else if (event == 'descending') {
      this.allusers.sort(function(a, b){
        var name_a = a['name'].toLowerCase();
        var name_b = b['name'].toLowerCase();
        if(name_a > name_b){
            return -1 ;
        }
        else if( name_a < name_b){
            return 1 ;
        }
        else{
            return 0;
        }
      });
    }
  }
}
