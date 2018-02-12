import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';

import {CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';


import { SidebarComponent } from './sidebar/sidebar.component';
import {ContainerComponent} from './container/container.component';
import {HeaderComponent} from './header/header.component';

//users components
import {AllusersComponent} from './allusers/allusers.component';
import {NewusersComponent} from './newusers/newusers.component';
import { EditUserComponent } from './edit-user/edit-user.component';

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

// editor
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// Services
import {LoginserviceService} from './loginservice.service';
import {PartnershipFormService} from './FormBuilder/partnership-form.service';

//pipe
import {FilterPipe} from './filter.pipe';
import {DndModule} from 'ng2-dnd';

// cke editor
import {CKEditorModule} from 'ngx-ckeditor';

//loader
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    ContainerComponent,
    HeaderComponent,
    SidebarComponent,
    AllusersComponent,
    NewusersComponent,
    EditUserComponent,
    AdmindashboardComponent,
    PartnershipPanelComponent,
    PartnershipsettingComponent,
    FormBuilderComponent,
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
    FilterPipe
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot(),
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CKEditorModule,
    Ng4LoadingSpinnerModule.forRoot(),
    [FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()]
  ],
  providers: [CookieService,LoginserviceService,PartnershipFormService,Ng4LoadingSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
