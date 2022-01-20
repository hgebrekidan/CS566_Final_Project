import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  template: `
  <p>
  <h2>Services</h2>
  <button [routerLink]="['/','addService']">provide service</button>

  `,
  styles: [
    `
    `
  ]
})
export class ServiceComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

}
