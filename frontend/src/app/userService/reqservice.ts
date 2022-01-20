import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client:HttpClient) { }
  getData(){
  const data= this.client.get('http://localhost:3000/serviceProvider');
  const v=JSON.stringify(data)
  console.log(JSON.parse(v));
}
}