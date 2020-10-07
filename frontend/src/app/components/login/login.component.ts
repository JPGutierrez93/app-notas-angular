import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public authAlert:boolean = false;
  
  user = {
    email: '',
    password:''
  }

    constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  ngOnInit(): void {
  }

  logIn(){

    this.authService.logIn(this.user)
      .subscribe(
        res => {  
          if(res.message == 'CONTRASEÑA INCORRECTA'){
            this.authAlert = true;
          }else{
            this.authAlert = false;
            localStorage.setItem('token', res.token);
            localStorage.setItem('nombre', res.nombre);
            localStorage.setItem('id_usuario', res.id);
            this.router.navigate(['/notas']);
          }

        },
        err => {
          console.log(err);
          this.authAlert = true;
        }
      )
  }

  setAuthAlertFalse(){
    this.authAlert = false;
  }

}
