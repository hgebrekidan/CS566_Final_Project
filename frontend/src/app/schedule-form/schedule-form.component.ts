import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScheduleService} from "./schedule.service";

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {
  scheduleForm: FormGroup;
  formErrorsMsg: any[] = [];
  formSuccessMsg: any[] = [];
  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) {
    this.scheduleForm = this.createForm();
  }

  private createForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    if(this.scheduleForm.invalid) {
      this.formErrorsMsg = ['Please fill all fields with appropriate value.'];
      return;
    }
    this.scheduleService.post(this.scheduleForm.value).subscribe(
      resp => {
        this.formSuccessMsg = [resp];
        console.log(resp);
      }
    )
  }

}
