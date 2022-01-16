import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleFormComponent} from "./schedule-form/schedule-form.component";

const routes: Routes = [
  {
    path: 'appointment',
    component: ScheduleFormComponent
  },
  {
    path: '',
    redirectTo: 'appointment',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
