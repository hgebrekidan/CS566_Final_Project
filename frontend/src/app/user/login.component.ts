import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { LogService } from '../userService/user.service';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="myform" (ngSubmit)="signin()">
      <div class="box center">
        <div class="icon center">
          <i class=" far fa-user fa-2x"></i>
        </div>
        <h1>Log in</h1>
        <div>
        <label for="email">Email</label><br/>
      <input type="email" id="email" formControlName="email" /><br />
      <!-- <p *ngIf="emailExits" id="emailExits">Email is already exist try again</p><br/> -->
      <label for="password">password</label><br/>
      <input type="password" id="password" formControlName="password" /><br />
        </div>
        <br />
        <button class="btn" type="submit" style="margin:8px;">Login</button>
        <button class="btn" [routerLink]="['/', 'signup']" style="margin:8px;">Sign up</button>
      </div>
    </form>
  `,
  styles: [
    `

      .btn {
        background-color: #4caf50;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  myform: FormGroup;

  constructor(
    private formbuild: FormBuilder,
    private myservice: LogService,
    private route: Router
  ) {
    this.myform = this.formbuild.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin() {
    console.log( this.myform.value);
    console.log('123456789');
    this.myservice.signin(this.myform.value).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('token',data.token);
      localStorage.setItem('userData',JSON.stringify(data.userData));
      console.log(data.token)
       data.token
      ? this.route.navigate(['/','list','service'])
        :alert('Invalid user')
    });
  }
  ngOnInit(): void {}
}
