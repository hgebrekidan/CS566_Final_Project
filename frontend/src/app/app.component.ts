import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <header class="header">
    <h2 style="font-family:verdana;">MAHARISHI INTERNATIONAL UNIVERSITY CAMPUS CLINIC</h2>

    <p style="font-family:itaics;">CAMPUS COMMUNITY COVID 19 TEST CENTER</p>
  </header>
  <body class="div">

<div style="background-color:grey;color:white;padding:0px; width:95%;">

<img src="https://s3.amazonaws.com/hailemariamt.com/covid_background.jpeg">

<div class="text" style="font-family:verdana;">
  Register Free Account **
  Make An Appointment **
  Check Your Health Status **
  Make Your Family Safe **
  Live Your Happy Life

</div>



<marquee><h3>Connect and Make An Appointment</h3>
<marquee behavior="alternate">
    <h2>Go Schedule Your Appointment</h2>
  </marquee>
</marquee>

</div>

    <!-- <app-add></app-add> -->

  <router-outlet></router-outlet>
</body>
  <footer class="footer" >
  <p style="font-family:verdana;">@HAILEMARIAM GEBREKIDAN 2022<br/>MAHARISHI INTERNATIONAL UNIVERSITY
  </footer>
  `,
  styles: [`
  body{
    background-color: LightBlue;
    padding:100px;
    top: 0;
    width:100%;
    border: 3px solid white;
  },
  button{
    text-align:right;
  }
  .footer{
  position:fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: grey;
  color: black;
  text-align: center;
  border: 3px solid LightBlue;
  padding-top: 5px
}
.header{
  position: fixed;
  width: 100%;
  background-color: grey;
  color: black;
  text-align: center;
  top: 0;
  border: 3px solid LightBlue;
  padding-top: 5px
}
.text{
  color: indigo;
}

h3,h1{
color: purple;
align:center;
},
.div{
  border: 10px outset white;
  background-color: grey;
  text-align: center;
  display:center;
}
ul {
  list-style-type: none;
  margin: 0;
  padding:0;
}

li {
  display: inline;
}
  `]
})
export class AppComponent {
    }

