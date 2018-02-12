import { NgModule,Injectable }             from '@angular/core';
import { RouterModule, Routes,CanActivate,Router } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import {BuildersComponent} from './BuilderModule/builders/builders.component';
import {NewbuilderComponent} from './BuilderModule/newbuilder/newbuilder.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

//Builder module
import { BuilderAllComponent } from './BuilderModule/builder-all/builder-all.component';
import { BuilderDasboardComponent } from './BuilderModule/builder-dasboard/builder-dasboard.component';
import { BuilderSidebarComponent } from './BuilderModule/builder-sidebar/builder-sidebar.component';
import { BuilderHeaderComponent } from './BuilderModule/builder-header/builder-header.component';
import { BuilderContainerComponent } from './BuilderModule/builder-container/builder-container.component';
import { PatnershipComponent } from './BuilderModule/patnership/patnership.component';
import { PatnershipOverviewComponent } from './BuilderModule/patnership-overview/patnership-overview.component';
import { UpdatePatnershipComponent } from './BuilderModule/update-patnership/update-patnership.component';
import { NewPatnershipComponent } from './BuilderModule/new-patnership/new-patnership.component';
import { PatnershipStatusComponent } from './BuilderModule/patnership-status/patnership-status.component';
import { BuildersOverviewComponent } from './BuilderModule/builders-overview/builders-overview.component';
import { UpdateBuilderComponent } from './BuilderModule/update-builder/update-builder.component';
import { AllusersComponent } from './BuilderModule/allusers/allusers.component';
import { NewusersComponent } from './BuilderModule/newusers/newusers.component';

//partnership components
import { PartnershipAllComponent } from './BuilderModule/partnership-all/partnership-all.component';


//New partenership Components 
import { Step1Component } from './BuilderModule/new-patnership/step-1/step-1.component';
import { Step2Component } from './BuilderModule/new-patnership/step-2/step-2.component';
import { Step3Component } from './BuilderModule/new-patnership/step-3/step-3.component';
import { Step4Component } from './BuilderModule/new-patnership/step-4/step-4.component';
import { Step5Component } from './BuilderModule/new-patnership/step-5/step-5.component';
import { Step6Component } from './BuilderModule/new-patnership/step-6/step-6.component';
import { Step7Component } from './BuilderModule/new-patnership/step-7/step-7.component';
import { Step8Component } from './BuilderModule/new-patnership/step-8/step-8.component';
import { Step9Component } from  './BuilderModule/new-patnership/step-9/step-9.component';
import { Step10Component } from './BuilderModule/new-patnership/step-10/step-10.component';
import { Step11Component } from './BuilderModule/new-patnership/step-11/step-11.component';
import { Step12Component } from './BuilderModule/new-patnership/step-12/step-12.component';
import { Step13Component } from './BuilderModule/new-patnership/step-13/step-13.component';
import { Step14Component } from './BuilderModule/new-patnership/step-14/step-14.component';
import { Step15Component } from './BuilderModule/new-patnership/step-15/step-15.component';

import { FormPreviewComponent } from './BuilderModule/new-patnership/form-preview/form-preview.component';
// auth guard
import {AuthGuard} from './auth-guard.service';


const routes: Routes = [
    {path:'traders', component:LoginComponent,
      children:[
        {path:'', component:LoginFormComponent},
        {path:'forgotPassowrd', component:ForgotPasswordComponent},
        {path:'signup', component:SignupComponent},
        {path:'changepassword/', component:ChangePasswordComponent}
      ]
    },
  //builder routes
  {path:'', component:BuilderContainerComponent,canActivate:[AuthGuard],children:[
    {path:'',component:BuilderDasboardComponent},
    {path:'builders', component:BuildersComponent,children:[
      {path:'', component:BuilderAllComponent},    
      {path:'create', component:NewbuilderComponent},
      {path:'update/:id', component:NewbuilderComponent},
      {path:":id",component:BuildersOverviewComponent}
    ]},
    // partnership routes
    {path:"partnership",component:PatnershipComponent, children:[
      {path:'',component:PartnershipAllComponent},
      {path:"partnership/:id",component:PatnershipOverviewComponent},
      {path:"update",component:UpdatePatnershipComponent},
      {path:"status",component:PatnershipStatusComponent},
      {path:"create",component:NewPatnershipComponent, children:[
       {path:'', component:Step1Component},
       {path:'step-2', component:Step2Component},
       {path:'step-3', component:Step3Component},
       {path:'step-4', component:Step4Component},
       {path:'step-5', component:Step5Component},
       {path:'step-6', component:Step6Component},
       {path:'step-7', component:Step7Component},
       {path:'step-8', component:Step8Component},
       {path:'step-9', component:Step9Component},
       {path:'step-10',component:Step10Component},
       {path:'step-11', component:Step11Component},
       {path:'step-12', component:Step12Component},
       {path:'step-13', component:Step13Component},
       {path:'step-14', component:Step14Component},
       {path:'step-15', component:Step15Component},
       {path:'formpreview', component:FormPreviewComponent}
      ]},
    ]},
    {path:'newUser', component:NewusersComponent},
    {path:'users',component:AllusersComponent},
    {path:'changepassword',component:ChangePasswordComponent}
  ]},
  
  {path:'**', redirectTo:'traders'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}