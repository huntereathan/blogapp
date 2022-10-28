import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  constructor(private _http: HttpClient, private _router: Router) { }
  data = JSON.parse(localStorage.getItem('auth-token') || '{}');
  
  submitRegister(body: any){
    return this._http.post(this.apiURL + 'auth/register', body, {
      observe:'body'
    })
  }

  submitLogin(body: any){
    return this._http.post('/api/auth/login', body, {
      observe:'body'
    })
  }

  loggedIn(){
    return !!this.data.token;
  }

  logoutUser(){
    localStorage.removeItem('auth-token');
    this._router.navigate(['/login'])
  }
}
