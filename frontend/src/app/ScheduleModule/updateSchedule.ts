import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-service',
  template: `
   <h1>Update Service</h1>
   <form [formGroup]="editForm"></form>
  `,
  styles: [
  ]
})
export class UpdateServiceComponent implements OnInit {
editForm!: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

}
