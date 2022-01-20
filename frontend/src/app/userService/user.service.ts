import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const HTTP_REQUEST: string = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})

export class LogService {
  constructor(private client:HttpClient) { }
  //provide service
  getAppointments() {
    return this.client.get(`${HTTP_REQUEST}/schedules/appointments`, {headers:{Authorization:localStorage["token"]}});
  }
  addAppointments(value1:any){
    //console.log("???????????????????????")
     return this.client.post(`${HTTP_REQUEST}/schedules/appointments`,value1)
    }
  getServicesByCity(city:any){
    return this.client.get(`${HTTP_REQUEST}/serviceProviders`,city)
  }
  updateServices(){
    return this.client.patch(`${HTTP_REQUEST}/serviceProviders`,{
    })
  }
  deleteAppointments(id:any){
   // console.log(id+"+++++++++++")
    return this.client.delete(`${HTTP_REQUEST}/schedules/appointments/${id}`)
  }
  //service request
  getRequests() {
    return this.client.get(`${HTTP_REQUEST}/serviceRequesters`);
  }
  postRequests(value1:any){
     return this.client.post(`${HTTP_REQUEST}/serviceRequesters`,value1)
    }
  getRequestsByCity(city:any){
    return this.client.get(`${HTTP_REQUEST}/serviceRequesters`,city)
  }
  updateRequests(){
    return this.client.patch(`${HTTP_REQUEST}/serviceRequesters`,{
    })
  }
  deleteRequests(id:any){
    return this.client.delete(`${HTTP_REQUEST}/serviceRequesters`,id)
  }
  //user Authitication
  signup(obj:any){
    return this.client.post(`${HTTP_REQUEST}/users/signup`,obj)
  }
  signin(data: any) {
    return this.client.post(`${HTTP_REQUEST}/users/login`,data)
  }

  addReplyToServiceComment(){

  }
  getserviceproviderbyid(id:any){

  }
  addCommentToServiceProvider(id:any,word:any){

  }
  getprofile(id:any){
    return this.client.get(`${HTTP_REQUEST}/users`,id)
  }
}
