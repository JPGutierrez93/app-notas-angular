import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    nombre:'',
    email:'',
    password:''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  signUp(){

    this.authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res);
          alert('Usuario '+ res.user.nombre +' creado con éxito!');
          this.router.navigate(['/login']);
          
        },
        err => {
          alert('No se pudo crear el usuario. Intente con otro email');
          console.log(err);
        }
      )

  }

}
