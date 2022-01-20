import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../user/home.component';
import { LoginComponent } from '../user/login.component';
import { SignupComponent } from '../user/signup.component';
import { ServiceComponent } from './service.component';

import { AddServiceComponent } from './addSchedule';

import { DeleteServiceComponent } from './deleteSchedule';

import { ServiceList } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    ServiceList,
    AddServiceComponent,
    FilterPipe,

  ],
  imports: [

    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
    {path:'list/service',component:ServiceList},
    {path:'out',component:AppComponent},
    {path:'home',component:HomeComponent},
    {path:'',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'request',component:ServiceComponent},



    {path:'addService',component:AddServiceComponent},
    {path:'deleteService',component:DeleteServiceComponent},

    ])
  ],
  exports:[]
})
export class ProviderModule { }
