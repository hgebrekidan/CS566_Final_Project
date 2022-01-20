// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscriber, Subscription, } from 'rxjs';
import { LogService } from '../userService/user.service';

@Component({
  selector: 'app-getch',
  template: `

  <h1>Appointment List</h1>

  <!-- <button mat-raised-button [routerLink]="['/','home']">Home</button> -->
<div>
  <!-- <input style="margin: 4px 2px;"  name = "search" type="text" [(ngModel)]="searchText" placeholder="Search Appointment"/> -->
  <input style="margin: 4px 2px;" #search name="search" type="text" placeholder="Search Appointment"/>
  <!-- {{searchText}} -->
  <button class="btn" (click)="onClick(search.value)" >Search</button><br/>
  <table>
  <tr>

      <th> FirstName </th>
      <th> LastName </th>
      <th> Appointment Date</th>
      <th> Appointment Time</th>

  </tr>

<tr *ngFor="let item of appointments | filter: search.value">

      <td> {{item?.firstName}}</td>
      <td> {{item?.lastName}}</td>
      <td> {{item?.appointmentDate}}</td>
      <td> {{item?.appointmentTime}}</td>
<button (click)="deleteAppointment(item._id)">Cancel</button>
<button>Edit</button>
</tr>
  </table><br/></div>
  <!-- [routerLink]="['/','addService']" -->
  <!-- (click)="showNewAppointementForm()" -->
  <button class="btn" (click)="showNewAppointementForm()" >Add New Appointment</button><br/><br/>
  <div *ngIf="showAddFrom" class="input">
  <form [formGroup]="form" (ngSubmit)="submit()">

  <input  type="text" id="firstName" placeholder="FirstName" formControlName="firstName"><br/>
  <input  type="text" id="lastName" placeholder="LastName" formControlName="lastName"><br/>
  <input  type="email" id="email" placeholder="example@gmail.com" formControlName="email"><br/>
  <input   type="date" id="appointmentDate" placeholder="Appointment Date" formControlName="appointmentDate"><br/>
  <input   type="time" id="appointmentTime" placeholder="Appointment Time" formControlName="appointmentTime"><br/>


  <button class="btn" type="submit">Submit Appointment</button>
</form>

<div  class= "exist" *ngIf="isExist">This already existed</div>
  </div>
  <button class ="btn" [routerLink]="['/']">Signout</button>
  <router-outlet></router-outlet>


  `,
  styles: [`
  table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}


td, th {
  /* border: 1px solid #dddddd; */
  text-align: left;
  padding: 8px;
}
input{
  background-color:grey;
  border: none;
  color: black;
  padding: 4px 100px;
  text-decoration: none;
  margin: 4px 2px;
}
.exist{
  color:red;
  font-size:"40px"
}

.btn{
  background-color:teal;
  border: none;
  color: black;
  padding: 4px 100px;
  text-decoration: none;
  margin: 4px 2px;
}
  h4{
    color : white;
    text-align:left;
  }
  `]
})
export class ServiceList implements OnInit {
  appointments:any[]=[];
  value:any={};
  showAddFrom:boolean=false
  subscription!:Subscription;
  useInfo:any;
  form!: FormGroup;
  userData: any;
  isExist:boolean=false
  searchText!: string;
  constructor(private Lists: LogService,private router:Router,private fb:FormBuilder,private data:LogService) {
    this.useInfo = localStorage.getItem('userData');
    this.useInfo = JSON.parse(this.useInfo);
  this.Lists.getAppointments().subscribe((response:any)=>{
  this.appointments=response.data;
  console.log("2222222222222222222")
  //this.value=this.appointments;
   console.log(this.appointments)
  //  console.log(localStorage.getItem('token'))
  })
  }
  onClick(event:any){
    console.log(event);
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      'firstName':[this.useInfo.firstName],
      'lastName': [this.useInfo.lastName],
      'email': [this.useInfo.email],
      'appointmentDate': ['', Validators.required],
      'appointmentTime': ['', Validators.required]
    });
  }
  // token on the local storage has been cleared after signout


  deleteAppointment(appointmentId: any){
    this.Lists.deleteAppointments(appointmentId).subscribe((response:any) =>{
      console.log(response)
      this.appointments = this.appointments.filter((appointment:any)=>appointment._id !== appointmentId)
    }
)
  }
  updated(){
    this.Lists.updateServices().subscribe((response:any) =>
    {(response)
    });

  }
  // onhome(){
  //   this.router.navigate(['/','home']);
  // }

  showNewAppointementForm(){
    this.showAddFrom=!this.showAddFrom
  }
  ngOnDestroy(): void {
  // this.subscription.unsubscribe();
  localStorage.removeItem('token');

  }

  submit(){
    this.data.addAppointments(this.form.value).subscribe((response:any) =>{
      console.log("=================????? ",response)
      //this.showAddFrom=false
      if(response.success===1){
        this.appointments=[response.appointmentData,...this.appointments]
        this.isExist=false
        this.showAddFrom=false
      }else{
        this.isExist=true
        this.showAddFrom=true
      }

     // this.router.navigate(['/','list','service'])
      // this.obj=response.appointmentData
      // console.log(response)
      // console.log(localStorage.getItem('userData'))
      // console.log("12345yyyyyyyyyyy")
      // if(response.success === 1)


    });
  }
}
