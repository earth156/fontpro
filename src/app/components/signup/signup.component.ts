import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersPostReq } from '../../model/users.post.req';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { conn } from "../../../api/dbconnect";
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatFormFieldModule
  ,MatInputModule,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private router: Router, private httpClient: HttpClient) {}

  check(){
    this.router.navigate(['/']);
  }

  firstName: any;
  lastName: any;
  email: string = '';
  password: string = '';
  type_user: string = 'user'; // Set default value for type_user
  signupSuccess: boolean = false; // Track signup success

  getSignUp() {
    const firstName = this.firstName;
    const lastName = this.lastName;
    const email = this.email;
    const password = this.password;
  
    const url = 'https://backpro-4.onrender.com/facemash/signup/';
  
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    };
  
    this.httpClient.post(url, userData).subscribe(
      (response: any) => {
        console.log('User successfully signed up:', response);
        // Reset form fields if needed
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
  
        // Show signup success message using Swal.fire
        Swal.fire('สมัครสำเร็จ', '', 'success');
      },
      (error: any) => {
        console.error('Error during signup:', error);
      }
    );
  }
}  
