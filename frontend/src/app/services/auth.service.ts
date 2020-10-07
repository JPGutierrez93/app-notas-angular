import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3700/api'

  constructor(private http: HttpClient) { 

  }

  signUp(user){
    return this.http.post<any>(this.URL+'/signup', user);
  }

  logIn(user){
    return this.http.post<any>(this.URL+'/login', user);
  }

  loggedIn(){
    //en una linea el if de abajo sería asi:
    //return !!localStorage.getItem('token');
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }

  nombreUsuario(){
    return localStorage.getItem('nombre');
  }

}
