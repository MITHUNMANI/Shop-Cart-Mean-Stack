import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  constructor(public http: HttpClient) {
  }
  userLogin(data: any) {
    console.log(data);
    return this.http.post('http://localhost:3000/login', data);
  }
  userRegistration(data: any) {
    // console.log(data);
    return this.http.post('http://localhost:3000/register', data);
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  getMyToken(){
    return localStorage.getItem('token');
  }
}
