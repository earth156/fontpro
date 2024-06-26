import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PostPostReq } from '../../model/Posts.post.req.js';
@Component({
  selector: 'app-adminview-profile',
  standalone: true,
  imports: [MatToolbarModule,HttpClientModule,MatButtonModule,CommonModule],
  templateUrl: './adminview-profile.component.html',
  styleUrl: './adminview-profile.component.scss'
})
export class AdminviewProfileComponent {
  pictureData: PostPostReq[] = [];
  userId: string = ''; // กำหนดค่าเริ่มต้นสำหรับ userId

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['user_id'];
      console.log('Received user ID:', this.userId);
      this.getPictureData(this.userId);
    });
  }
  
  
  
  // เมทอดเพื่อดึงข้อมูลภาพจาก API โดยใช้ userId
  getPictureData(id: string) {
    if (!id) {
      console.error('User ID is undefined or empty');
      return; // ออกจากเมทอดถ้า user_id เป็น undefined หรือว่างเปล่า
    }
  
    this.httpClient.get(`https://backpro-4.onrender.com/facemash/profile/${id}`).subscribe(
      (data: any) => {
        this.pictureData = data;
      },
      (error) => {
        console.error('Error fetching picture data:', error);
      }
    );
  }
  

  // // เมทอดตัวอย่างสำหรับการนำทางไปยังหน้าโหวต
  // toVote() {
  //   this.router.navigate(['/vote']);
  // }

  // เมทอดตัวอย่างสำหรับการนำทางไปยังหน้าโปรไฟล์
  toProfile() {
    this.router.navigate(['/']);
  }

  // เมทอดตัวอย่างสำหรับการนำทางไปยังหน้าแก้ไขโปรไฟล์
  toEdit(userId: string) {
    this.router.navigate(['/edit'], { queryParams: { user_id: userId } });
  }

  // เมทอดตัวอย่างสำหรับการนำทางไปยังหน้าอัปโหลดภาพ
  toUpload(userId: string) {
    this.router.navigate(['/upload'], { queryParams: { user_id: userId } });
  }
  // เมทอดสำหรับการล็อกเอ้าท์
  logout() {
    this.router.navigate(['/']);
  }

  // เพิ่มเมทอดใหม่
goToGraph(pictureUrl: string) {
  // ส่งค่า URL ของภาพไปยังหน้า graph
  this.router.navigate(['/graph'], { queryParams: { picture_url: pictureUrl } });
}
}

