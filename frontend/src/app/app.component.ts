import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <body class="div">

<div style="background-color:grey;color:white;padding:0px; width:95%;">

<img src="https://s3.amazonaws.com/hailemariamt.com/covid_background.jpeg">

<div class="text">
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
  <p>@Hailemariam Gebrekidan 2022<br/>Maharishi International University
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
  border: 3px solid black;
  padding-top: 5px
}
.text{
  color: LightGreen
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

