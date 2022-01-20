import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from '../userService/user.service';

@Component({
  selector: 'app-servicepost',
  template: `
   <table class="table table-striped">
  <thead>
    <tr>
      <th>ListNo</th>
      <th>Provide</th>
      <th>Name</th>
      <th>email</th>
      <th>phone</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <!-- <td>{{ 1 }}</td>
      <td>{{ output.service }}</td>
      <td>{{ output.name }}</td>
      <td>{{ output.contact }}</td>
      <td>{{ output.phone }}</td> -->

      <button (click)="check()">delete</button>
</tr>
   </tbody>
   </table>
      <div>
      <textarea placeholder="comment" name="w3review" rows="4" cols="70"></textarea><br>
      <button class>comment</button>
</div>
  `,
  styles: [`
  button{
    background-color:white;
  }
  `],
})
export class PostServiceComponent{
  output: any;
  constructor(
    private router: Router,
    private myservice: LogService,
    private formBuilder: FormBuilder
  ) {
    this.output=this.router.getCurrentNavigation()?.extras.state
  }
check(){
alert('Are you sure delete the service you provide')
}
}

