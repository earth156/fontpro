import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { PostPostReq } from '../../model/Posts.post.req.js';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatFormFieldModule
    ,MatInputModule,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  userId: string = '';
  picture: string = '';
  // pictureData: PostPostReq[] = []; // ประกาศ property 'pictureData'
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // Get userId from URL parameter
    this.route.queryParams.subscribe(params => {
      this.userId = params['user_id'];
      console.log('Received user ID:', this.userId);
      this.uploadProfilePicture(this.userId);
    });
  }
  
  


  uploadProfilePicture(userId: string) {

    if (!this.picture) {
      console.error('ไม่มีรูปภาพที่จะอัปโหลด');
      return;
    }
  
    const userData = {
      picture: this.picture
    };
  
    this.httpClient.post<any>(`https://backpro-4.onrender.com/facemash/upload/${userId}`, userData)
      .subscribe((response: any) => {
        console.log('ภาพโปรไฟล์ได้รับการเพิ่มเรียบร้อยแล้ว:', response);
        // ทำสิ่งที่คุณต้องการหลังจากการเพิ่มภาพโปรไฟล์เสร็จสมบูรณ์
      }, (error: any) => {
        console.error('เกิดข้อผิดพลาดในการเพิ่มภาพโปรไฟล์:', error);
      });
  }

  check(userId: string) {
    this.router.navigate(['/profile'], { queryParams: { user_id: userId } });
  }
}
