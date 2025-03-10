import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { ContestCardComponent } from './components/contest-card/contest-card.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';
import { CustomDirectiveDirective } from './directives/custom-directive.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ContestCardComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CustomPipePipe,
    CustomDirectiveDirective,
    SubscribeComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Customize position
      timeOut: 3000,  // Auto close after 3 seconds
      progressBar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
