import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent }         from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
//services
import {LoginserviceService} from './loginservice.service';
import {NewbuilderComponent} from './BuilderModule/newbuilder/newbuilder.component';
import {BuilderserviceService} from './builderservice.service';
import {AuthGuard} from './auth-guard.service';

//Builder module
import {BuildersComponent} from './BuilderModule/builders/builders.component';
import { BuilderDasboardComponent } from './BuilderModule/builder-dasboard/builder-dasboard.component';
import { BuilderSidebarComponent } from './BuilderModule/builder-sidebar/builder-sidebar.component';
import { BuilderHeaderComponent } from './BuilderModule/builder-header/builder-header.component';
import { BuilderContainerComponent } from './BuilderModule/builder-container/builder-container.component';
import { PatnershipComponent } from './BuilderModule/patnership/patnership.component';
import { PatnershipOverviewComponent } from './BuilderModule/patnership-overview/patnership-overview.component';
import { UpdatePatnershipComponent } from './BuilderModule/update-patnership/update-patnership.component';
import { NewPatnershipComponent } from './BuilderModule/new-patnership/new-patnership.component';
import { PatnershipStatusComponent } from './BuilderModule/patnership-status/patnership-status.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import { BuildersOverviewComponent } from './BuilderModule/builders-overview/builders-overview.component';
import { UpdateBuilderComponent } from './BuilderModule/update-builder/update-builder.component';
import { AllusersComponent } from './BuilderModule/allusers/allusers.component';
import { NewusersComponent } from './BuilderModule/newusers/newusers.component';

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

import {NewpartnershipService} from './BuilderModule/new-patnership/newpartnership.service';
import { PartnershipAllComponent } from './BuilderModule/partnership-all/partnership-all.component';
import { BuilderAllComponent } from './BuilderModule/builder-all/builder-all.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FormPreviewComponent } from './BuilderModule/new-patnership/form-preview/form-preview.component';

//date picker
import { MyDatePickerModule } from 'mydatepicker';





@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MyDatePickerModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    ForgotPasswordComponent,
    SignupComponent,
    BuildersComponent,
    NewbuilderComponent,
    BuilderDasboardComponent,
    BuilderSidebarComponent,
    BuilderHeaderComponent,
    BuilderContainerComponent,
    PatnershipComponent,
    PatnershipOverviewComponent,
    UpdatePatnershipComponent,
    NewPatnershipComponent,
    PatnershipStatusComponent,
    ChangePasswordComponent,
    BuildersOverviewComponent,
    UpdateBuilderComponent,
    AllusersComponent,
    NewusersComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,
    Step8Component,
    Step9Component,
    Step10Component,
    Step11Component,
    Step12Component,
    Step13Component,
    Step14Component,
    Step15Component,
    PartnershipAllComponent,
    BuilderAllComponent,
    SafeHtmlPipe,
    FormPreviewComponent
  ],
  providers: [AuthGuard,LoginserviceService,BuilderserviceService,NewpartnershipService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
