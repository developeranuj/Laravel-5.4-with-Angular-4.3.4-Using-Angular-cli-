import {NgModule,Injectable} from '@angular/core';
import { RouterModule, Routes,Router, CanActivate } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {ContainerComponent} from './container/container.component';
//users components
import {AllusersComponent} from './allusers/allusers.component';
import {NewusersComponent} from './newusers/newusers.component';
import {EditUserComponent} from './edit-user/edit-user.component'
import {AdmindashboardComponent} from './admindashboard/admindashboard.component';

//partnership form panel 
import { PartnershipPanelComponent } from './FormBuilder/partnership-panel/partnership-panel.component';

import { PartnershipsettingComponent } from './partnershipsetting/partnershipsetting.component';
import { FormBuilderComponent } from './FormBuilder/form-builder/form-builder.component';
import { Step1Component } from './FormBuilder/step-1/step-1.component';
import { Step2Component } from './FormBuilder/step-2/step-2.component';
import { Step3Component } from './FormBuilder/step-3/step-3.component';
import { Step4Component } from './FormBuilder/step-4/step-4.component';
import { Step5Component } from './FormBuilder/step-5/step-5.component';
import { Step6Component } from './FormBuilder/step-6/step-6.component';
import { Step7Component } from './FormBuilder/step-7/step-7.component';
import { Step8Component } from './FormBuilder/step-8/step-8.component';
import { Step9Component } from './FormBuilder/step-9/step-9.component';
import { Step10Component } from './FormBuilder/step-10/step-10.component';
import { Step11Component } from './FormBuilder/step-11/step-11.component';
import { Step12Component } from './FormBuilder/step-12/step-12.component';
import { Step13Component } from './FormBuilder/step-13/step-13.component';
import { Step14Component } from './FormBuilder/step-14/step-14.component';
import { Step15Component } from './FormBuilder/step-15/step-15.component';
    
    @Injectable()
export class AlwaysAuthGuard implements CanActivate {
 
   constructor(private router: Router) {}
 
   public canActivate() {
    
        let loggedinUser = JSON.parse(localStorage.getItem('user'));
        console.log(loggedinUser);
        if(loggedinUser.usermeta[0].role==1){
            return true;
        }
        else if(loggedinUser.usermeta[0].role==2){
            // window.location.href= '/traders';
            return false;
        }
        else{  
            this.router.navigate(['/admin']);
            return false;
        }      
   }
}

const routes: Routes = [
	{path:'admin', component:LoginComponent,children:[
		{path:'', component:LoginFormComponent}
	]},
    {path:'admin-tools', component:ContainerComponent,canActivate:[AlwaysAuthGuard],children:[
        {path:"" , component:AdmindashboardComponent},
        //test path
        {path:'test',component:FormBuilderComponent},
        //end of test path
        { path:'user' , children:[
            { path:'' ,component:AllusersComponent},
            { path:'create' ,component:NewusersComponent},
            { path:':id' ,component:EditUserComponent},
        ]},
        { path:'agreement' ,children:[
        	{path:'',component:PartnershipPanelComponent},
            {path:'step-1',component:Step1Component},
            {path:'step-1/:form_id',component:Step1Component},
        	{path:'step-2',component:Step2Component},
            {path:'step-3', component:Step3Component},
            {path:'step-4', component:Step4Component},
            {path:'step-5', component:Step5Component},
            {path:'step-6', component:Step6Component},
            {path:'step-7', component:Step7Component},
            {path:'step-8', component:Step8Component},
            {path:'step-9', component:Step9Component},
            {path:'step-10', component:Step10Component},
            {path:'step-11', component:Step11Component},
            {path:'step-12', component:Step12Component},
            {path:'step-13', component:Step13Component},
            {path:'step-14', component:Step14Component},
            {path:'step-15', component:Step15Component}
        ]}
	 ]},
	{path:'**',redirectTo:'admin'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AlwaysAuthGuard]
})
export class AppRoutingModule {}
