
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
    this.httpClient.get<any[]>('hhttps://backpro-qj8e.vercel.app/facemash/top-posts')
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
  tovote() {
      this.router.navigate(['/vote']);
  }
  toprofile() {
    this.router.navigate(['/']);
  }
  logout() {
    this.router.navigate(['/']);
  }
}



// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UsersPostReq } from '../../model/users.post.req';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatChipListbox } from '@angular/material/chips';
// import { map } from 'rxjs/operators';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { PostPostReq } from '../../model/Posts.post.req.js';
// import { CommonModule } from '@angular/common';
// import axios from 'axios';
// import { conn } from "../../../api/dbconnect";
// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [MatToolbarModule,MatButtonModule,HttpClientModule,CommonModule,MatChipListbox,MatChipsModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {
//     rankingData: any[] = [];
  
//     deltaRank: number = 0; // กำหนดค่าเริ่มต้นเป็น 0
  
//     selectedDate: string = '';
//     dateOptions: string[] = [];
//     today: string = '';
//     yesterday: string = '';
//     two_days_ago: string = '';
//     three_days_ago: string = '';
//     four_days_ago: string = '';
//     five_days_ago: string = '';
//     six_days_ago: string = '';
//     seven_days_ago: string = '';
    
  
//     constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}
  
//     ngOnInit() {
//       this.fetchDateOptions();
//     }
  
//     async fetchDateOptions() {
//       const HOST: string = 'http://localhost:4000';
//       const url = `${HOST}/facemash/ranking/date-options`;
    
//       try {
//         const response = await axios.get(url);
    
//         if (Array.isArray(response.data.dateOptions)) {
//           this.dateOptions = response.data.dateOptions;
//           this.seven_days_ago = this.dateOptions[0];
//           this.six_days_ago = this.dateOptions[1];
//           this.five_days_ago = this.dateOptions[2];
//           this.four_days_ago = this.dateOptions[3];
//           this.three_days_ago = this.dateOptions[4];
//           this.two_days_ago = this.dateOptions[5];
//           this.yesterday = this.dateOptions[6];
//           this.today = this.dateOptions[7];
   
    
//           this.filterByDate(this.today);
//         } else {
//           console.error('Invalid data format. Expected an array.');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
    
  
//     async filterByDate(selectedDate: string) {
//       console.log('Selected Date:', selectedDate);
//       this.selectedDate = selectedDate;
  
//       const HOST: string = 'http://localhost:4000';
//       const url = `${HOST}/facemash/ranking/data?selectedDate=${selectedDate}`;
  
//       try {
//         const response = await axios.post(url);
//         console.log('Response from server:', response);
  
//         this.rankingData = response.data;
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
  
//     goToGraphPage(imageId: number) {
//       this.router.navigate(['/app-graph'], { queryParams: { id: imageId } });
//     }  
    
//     toprofile() {
//       this.router.navigate(['/']);
//     }
  
//     logout() {
//       this.router.navigate(['/']);
//     }
// }
