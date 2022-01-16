import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantsUtil} from "../util/constants.util";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:  HttpClient) { }

  post(value: any) {
    return this.http.post(ConstantsUtil.URL + 'schedule', value);
  }
}
