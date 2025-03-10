import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private toaster:ToastrService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        () => {
          this.toaster.success('Registration Successful! Please login.');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error(error);
          this.toaster.success('Registration Failed. Try again.');
        }
      );
    }
  }
}
