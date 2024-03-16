
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PostPostReq } from '../../model/Posts.post.req.js';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { conn } from "../../../api/dbconnect";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,HttpClientModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  topPosts: PostPostReq[] = [];

  constructor(private router: Router, private httpClient: HttpClient) {}


  ngOnInit() {
    this.getTopPosts();
  }

  getTopPosts() {
    this.httpClient.get<any[]>('http://localhost:4000/facemash/top-posts/')
      .subscribe(
        (response) => {
          this.topPosts = response;
        },
        (error) => {
          console.error('Error fetching top posts:', error);
          // Handle error here
        }
      );
  }

  toprofile() {
    this.router.navigate(['/']);
  }
  logout() {
    this.router.navigate(['/']);
  }
}

