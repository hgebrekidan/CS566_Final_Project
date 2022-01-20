import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LogService } from '../userService/user.service';

@Component({
  selector: 'app-add',
  template: `
    <h3>Shedule Appointment </h3>
<form [formGroup]="form" (ngSubmit)="submit()">
  <input  type="text" id="firstName" placeholder="FirstName" formControlName="firstName"><br/>
  <input  type="text" id="lastName" placeholder="LastName" formControlName="lastName"><br/>
  <input  type="email" id="email" placeholder="example@gmail.com" formControlName="email"><br/>
  <input   type="date" id="appointmentDate" placeholder="Appointment Date" formControlName="appointmentDate"><br/>
  <input   type="time" id="appointmentTime" placeholder="Appointment Time" formControlName="appointmentTime"><br/>


  <button type="submit">Submit Appointment</button>
</form>
  `,
  styles: [`
  input{
  background-color:lightblue;
  border: none;
  color: black;
  padding: 16px 100px;
  text-decoration: none;
  margin: 4px 2px;
}
  `],
})
export class AddServiceComponent implements OnInit{
  obj:any;
  useInfo:any;
  form!: FormGroup;
  userData: any;
  constructor(private fb: FormBuilder,private data:LogService,private router:Router) {
    this.useInfo = localStorage.getItem('userData');
    this.useInfo = JSON.parse(this.useInfo);
    console.log(this.useInfo)

  }
submit(){
  //this.router.navigate(['/','list','service'])
  this.data.addAppointments(this.form.value).subscribe((response:any) =>{
    console.log("=================????? ",response)
    this.router.navigate(['/','list','service'])
    // this.obj=response.appointmentData
    // console.log(response)
    // console.log(localStorage.getItem('userData'))
    // console.log("12345yyyyyyyyyyy")
    // if(response.success === 1)


  });
}
  display(){
  //this.router.navigate(['post'], {state:this.obj})
  console.log(this.obj);
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      'firstName':[this.useInfo.firstName],
      'lastName': [this.useInfo.lastName],
      'email': [this.useInfo.email],
      'appointmentDate': ['', Validators.required],
      'appointmentTime': ['', Validators.required]
    });
    // console.log(this.useInfo)
    // console.log(this.form.value)

}

}
