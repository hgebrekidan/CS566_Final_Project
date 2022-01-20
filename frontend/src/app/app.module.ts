import { HttpClientModule } from '@angular/common/http';
//App module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProviderModule } from './ScheduleModule/provider.module';
import { ServiceComponent } from './ScheduleModule/service.component';
import { RouterModule } from '@angular/router';
import { AddServiceComponent } from './ScheduleModule/addSchedule';
import { DeleteServiceComponent } from './ScheduleModule/deleteSchedule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateServiceComponent } from './ScheduleModule/updateSchedule';
import { HomeComponent } from './user/home.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { FilterPipe } from './pipes/filter.pipe';




@NgModule({
  declarations:[
    AppComponent,
    ServiceComponent,
    // AddServiceComponent,
    DeleteServiceComponent,
    UpdateServiceComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FilterPipe,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ProviderModule,
    HttpClientModule,
    ReactiveFormsModule,


    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => {
          return import('./ScheduleModule/provider.module').then((data) => {
            return data.ProviderModule;
          });
        },
      },
    ]),
  ],
  exports:[RouterModule, FilterPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
