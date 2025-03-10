import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  data: Observable<any> | undefined;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    this.data=this.http.post(`${this.baseUrl}/login`, userData);
    this.data.subscribe({
      next:(data)=>console.log(data)
    })
    console.log(this.data);
    return this.data;
  }
  isLoggedin():boolean{
    return !!localStorage.getItem('token');
  }
  
  logout():void{
    localStorage.removeItem('token');
  }
  
}


