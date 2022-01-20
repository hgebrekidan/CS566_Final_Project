import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LogService } from '../userService/user.service'
@Component({
  selector: 'app-delete-course',
  template: `
  `,
  styles: [`

  `]
})
export class DeleteServiceComponent implements OnInit {
  constructor(private fb: FormBuilder,private data:LogService) {}
  ngOnInit(): void {

  }

}
