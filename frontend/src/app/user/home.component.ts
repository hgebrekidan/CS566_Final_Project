import { Component, OnInit } from '@angular/core';
import { LogService } from '../userService/user.service';


@Component({
  selector: 'app-home',
  template: `
  <h2>List of Patient Appointments</h2>
  <h2><a [routerLink]="['/','list']">Service Request</a><h2>
  <button [routerLink]="['/', '']">Add New Appintment</button>
  <button [routerLink]="['/']">sign out</button>

  <router-outlet></router-outlet>
  `,
  styles: [`
  h1{
    color:black;
  }
  `
  ]
})
export class HomeComponent {}
