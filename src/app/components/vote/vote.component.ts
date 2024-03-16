import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { ActivatedRoute } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,HttpClientModule,CommonModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent implements OnInit {
  show: PostPostReq[] = [];
  K: number = 32;
  PictureID: number[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}

  async ngOnInit() {
    const HOST: string = 'http://localhost:4000';
    const url = `${HOST}/facemash/vote`;
  
    try {
      const response = await axios.get(url);
  
      if (Array.isArray(response.data)) {
        this.show = response.data;

        this.PictureID = [this.show[0].post_id, this.show[1].post_id];
      } else {
        console.error('Invalid data format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  async vote(winnerPostId: number, loserPostId: number) {
    const URL = 'http://localhost:4000/facemash/vote';
    
    try {
        const response = await axios.post(URL, { winnerPostId, loserPostId });
        console.log('Response data:', response.data);

        const { updatedWinner, updatedEloRatingWinner, updatedLoser, updatedEloRatingLoser } = response.data;

        if (updatedWinner && updatedLoser) {
            this.updatePostScore(this.show, updatedWinner, updatedEloRatingWinner.newRating);
            this.updatePostScore(this.show, updatedLoser, updatedEloRatingLoser.newRating);
           
        } else {
        }
    } catch (error) {
        console.error('Error processing vote:', error);
    }
}


updatePostScore(postArray: any[], updatedPost: { post_id: any; }, newRating: any) {
  const postIndex = postArray.findIndex(post => post.post_id === updatedPost.post_id);

  if (postIndex !== -1) {
      const oldScore = postArray[postIndex].score;
      postArray[postIndex].score = newRating;

      console.log(`Post ID: ${updatedPost.post_id}, Old Score: ${oldScore}, New Score: ${newRating}`)
      
      // แสดง Swal.fire เฉพาะ Post ID ที่ชนะ
      if (newRating > oldScore) {
          Swal.fire({
            title: `You Vote Post ID: ${updatedPost.post_id}`,
            text: `Old Score: ${oldScore}, New Score: ${newRating}`,
            icon: "success"
          }).then(() => {
            // รีโหลดหน้าเว็บเมื่อกด OK
            // window.location.reload();
          });
      }
  }
}


  // async profile(userId: number) {
  //   const HOST: string = 'http://localhost:4000';
  //   const url = `${HOST}/facemash/profile`;


  //   // Load user profile data
  //   try {
  //     const response = await axios.get(url, { params: { userId } });
  //     const userProfile = response.data;

  //     // Use the loaded profile data as needed
  //   } catch (error) {
  //     console.error('Error fetching profile:', error);
  //   }
  // }
  toProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.router.navigate(['/']);
  }
}