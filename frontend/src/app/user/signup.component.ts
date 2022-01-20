import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogService } from '../userService/user.service';

@Component({
  selector: 'app-signup',
  template: `
   <div>

    <form [formGroup]="myform" (ngSubmit)="signup()">
      <label for="name">FirstName</label><br/>
      <input type="text" id="firstName" formControlName="firstName" /><br />
      <label for="name">LastName</label><br/>
      <input type="text" id="lastName" formControlName="lastName" /><br />
      <label for="name">Gender</label><br/>
      <input type="text" id="gender" formControlName="gender" /><br />
      <label for="name">birthDate</label><br/>
      <input type="text" id="birthDate" formControlName="birthDate" /><br />
      <label for="email">Email</label><br/>
      <input type="email" id="email" formControlName="email" /><br />
      <!-- <p *ngIf="emailExits" id="emailExits">Email is already exist try again</p><br/> -->
      <label for="password">password</label><br/>
      <input type="password" id="password" formControlName="password" /><br />
      <div *ngIf="passwordLength" class="alert alert-danger">
        <p>password length should be greater than 4 and lessthan 10 characters</p>
      </div>

      <label for="phone">Phone</label><br/>
      <input type="text" id="phone" formControlName="phone" /><br />
      <!-- <div formGroupName="address"><br/> -->
        <!-- <label for="address" id="address">Address</label><br /> -->
        <!-- <div class="address"><br/> -->
          <label for="address">Address</label><br/>
          <input type="text" formControlName="address" /><br />
          <label for="city">City</label><br/>
          <input type="text" formControlName="city" /><br />
          <label for="state">State</label><br/>
          <input type="text" formControlName="state" /><br />
          <label for="zipCode">Zipcode</label><br/>
          <input type="text" formControlName="zipCode" /><br/>
          <button [routerLink]="['/']" id="signin">
            Signup
          </button>
          <!-- <button [routerLink]="['/']" id="signin">
            Signin
          </button> -->
        <!-- </div> -->
      <!-- </div> -->
    </form>
  </div>



  `,
  styles: [
    `
    form{
      
    }
    `
  ]
})
export class SignupComponent implements OnInit {
    myform: FormGroup;
    emailExits: boolean = false;
    constructor(
      private formbuild: FormBuilder,
      private myservice: LogService,
      private route: Router
    ) {
      this.myform = this.formbuild.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        birthDate: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
        phone: ['', Validators.required],

          address: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zipCode: ['', Validators.required],

      });
      this.myform.valueChanges.subscribe((data) => {
        console.log(data);
      });
    }
    signup() {
      this.myservice.signup(this.myform.value).subscribe((data: any) => {
        (data.success === 1)
      });
    }

    ngOnInit(): void {}
    get passwordLength() {
      return (
        //@ts-ignore
        this.myform.get('password').invalid &&
        this.myform.get('password')?.touched
      );
    }
  }
