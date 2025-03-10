import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  email: string = '';
  showForm: boolean = false;
  successMessage: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  confirmSubscription() {
    this.showForm = true;
  }

  subscribe() {
    this.http.post('http://localhost:5000/api/auth/subscribe', { email: this.email }).subscribe(
      (response: any) => {
        alert('Subscription successful!')
        this.toastr.success("Subscription successful!")
        this.successMessage = "Thank you for subscribing!";
        this.showForm = false;
        this.toastr.success("Subscription successful!")
      },
      (error) => {
        this.toastr.error("Please Enter Valid email!!!")
        console.error("Subscription error:", error);
        this.toastr.error("Please Enter Valid email!!!")
      }
    );
  }
}
