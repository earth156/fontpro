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
import Swal from 'sweetalert2';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['user_id'];
    });
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.picture = selectedFile;
  }

  uploadProfilePicture(userId: string) {
    if (!this.picture) {
      console.error('ไม่มีรูปภาพที่จะอัปโหลด');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', this.picture);
  
    this.httpClient.post<any>(`https://backpro-4.onrender.com/facemash/upload/${userId}`, formData)
      .subscribe((response: any) => {
        console.log('ภาพโปรไฟล์ได้รับการเพิ่มเรียบร้อยแล้ว:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'เพิ่มภาพสำเร็จ!'
        });
      }, (error: any) => {
        console.error('เกิดข้อผิดพลาดในการเพิ่มภาพโปรไฟล์:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'เกิดข้อผิดพลาดในการเพิ่มภาพโปรไฟล์!'
        });
      });
  }

  check(userId: string) {
    this.router.navigate(['/profile'], { queryParams: { user_id: userId } });
  }
}