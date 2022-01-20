import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(appointmentsList: Array<any>, search: string): any {
    // console.log(appointmentsList, search)
  //   if(appointmentsList && search)
  //   return appointmentsList.filter(
  //     (appointment)=>appointment.firstName.indexOf(search) > -1 ||
  //     appointment.email.indexOf(search) > -1 ||
  //     appointment.lastName.indexOf(search) > -1
  //     );
  // return appointmentsList;

  if(!appointmentsList)return null;

if(!search)return appointmentsList;



search = search.toLowerCase();



return appointmentsList.filter(function(item){

return JSON.stringify(item).toLowerCase().includes(search);

});

}
  }


