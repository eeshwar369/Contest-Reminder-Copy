import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string=''

  constructor(private auuuthservive:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.auuuthservive.login({email:this.email,password:this.password}).subscribe(
      (response)=>{
        localStorage.setItem('token',response.token);
        localStorage.setItem('name',response.user.name);
        localStorage.setItem('email',response.email);
        this.router.navigate(['/dashboard'])
      }
    )
  }

}
