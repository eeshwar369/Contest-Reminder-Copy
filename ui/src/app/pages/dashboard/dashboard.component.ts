// import { Component, OnInit } from '@angular/core';
// import { ContestService } from '../../services/contest.service';
// import { HttpClient } from '@angular/common/http';


// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   contests: any[] = [];
//   username:string|null=localStorage.getItem('name');
//   isPopupVisible = false;
//   isSubscribed = false;
//   subscriptionSuccess = false;
//   // username = 'User'; // Set from backend after login
//   userEmail = localStorage.getItem('email'); // Should be set from backend after login

//   // console.log(username);




//   constructor(private contestService: ContestService,private  http:HttpClient) {}

//   ngOnInit() {
//     this.fetchContests();
//     console.log(this.username);
//   }
//   isDarkMode = false;

//   showSubscriptionPopup() {
//     this.isPopupVisible = true;
//   }

//   subscribe() {
//     if (this.isSubscribed) {
//       this.http.post('http://localhost:5000/api/subscribe', { email: this.userEmail })
//         .subscribe(response => {
//           console.log(response);
//           this.subscriptionSuccess = true;
//           this.isPopupVisible = false;
//         }, error => {
//           console.error('Error subscribing:', error);
//         });
//     }
//   }

  

//   toggleDarkMode() {
//     this.isDarkMode = !this.isDarkMode;
    
//     // Apply the dark mode class to the <body>
//     if (this.isDarkMode) {
//       document.body.classList.add('dark-theme');
//     } else {
//       document.body.classList.remove('dark-theme');
//     }
//   }

//   fetchContests() {
//     this.contestService.getupcomingcontest().subscribe({
//       next: (data) => {
//         // console.log('Received Contests:', data);
//         this.contests = data.map((contest: any) => ({
//           ...contest,
//           startTime: new Date(contest.start), // Convert start time to Date object
//           durationHours: (contest.duration / 3600).toFixed(0), // Convert duration from seconds to hours
//           timeUntilStart: this.calculateTimeUntilStart(new Date(contest.start))
//         }));
//       },
//       error: (error) => {
//         console.error('Error fetching contests:', error);
//       }
//     });
//   }

//   calculateTimeUntilStart(startTime: Date): string {
//     const now = new Date();
//     const diffMs = startTime.getTime() - now.getTime();
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     if (diffHours > 0) {
//       return `${diffHours}h ${diffMinutes}m`;
//     } else {
//       return `${diffMinutes}m`;
//     }
//   }
// }

import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ContestService } from '../../services/contest.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  contests: any[] = [];
  username: string | null = localStorage.getItem('name');
  isDarkMode = false;
  userEmail = localStorage.getItem('email');
  id:any=localStorage.getItem('user')
  showProfile = false;
  toggleUserProfile() {
    this.showProfile = !this.showProfile; // Toggle profile section
  }
  // console.log(id);
  private countdownSubscription!: Subscription; // Store interval subscription
  subscribedPlatforms: { [key: string]: boolean } = {};

  constructor(
    private contestService: ContestService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private zone: NgZone // Optimized update outside Angular zone
  ) {
  }

  ngOnInit() {
    this.fetchContests();
  }
  // toggleSubscription(platform1:string){
  //   // console.log(this.userEmail);

  //   const platformMap:{[key:string]:string}={
  //     "leetcode.com":"leetcode",
  //     "codechef.com":"codechef",
  //     "codeforces.com":"codeforces",
  //     "geeksforgeeks.org":"gfg",
  //     "atcoder.jp":"atcoder"

  //   }
  //   const  platform=platformMap[platform1];
  //   this.http.post('http://localhost:5000/api/subscribev2',{
  //     user_id:this.userEmail,
  //     platform:platform,

  //   }).subscribe((response:any)=>{
  //     if (response.success) {
  //       // Toggle the subscription status locally
  //       this.subscribedPlatforms[platform] = response.newStatus === 1;
  //     }


  //   })
  // }

  toggleSubscription(platform1:string){
    // console.log(this.userEmail);

    const platformMap:{[key:string]:string}={
      "leetcode.com":"leetcode",
      "codechef.com":"codechef",
      "codeforces.com":"codeforces",
      "geeksforgeeks.org":"gfg",
      "atcoder.jp":"atcoder"

    }
    const  platform=platformMap[platform1];
    this.subscribedPlatforms[platform] = true;
    console.log(this.subscribedPlatforms);
    // this.http.post('http://localhost:5000/api/subscribev2',{
    //   user_id:this.userEmail,
    //   platform:platform,

    // }).subscribe((response:any)=>{
    //   if (response.success) {
    //     // Toggle the subscription status locally
    //     this.subscribedPlatforms[platform] = response.newStatus === 1;
    //   }


    // })

  }


  isSubscribed(platform: string): boolean {
    return this.subscribedPlatforms[platform] || false;
    // return this.subscribedPlatforms.includes(platform); 
}


  // fetchContests() {
  //   this.contestService.getupcomingcontest().subscribe({
  //     next: (data) => {
  //       this.contests = data.map((contest: any) => ({
  //         ...contest,
  //         startTime: new Date(contest.start),
  //         durationHours: (contest.duration / 3600).toFixed(0),
  //         timeUntilStart: this.calculateTimeUntilStart(new Date(contest.start)) // Initial value
  //       }));

  //       // Start optimized real-time updates
  //       this.startLiveCountdown();
  //     },
  //     error: (error) => {
  //       console.error('Error fetching contests:', error);
  //     }
  //   });
  // }

  fetchContests() {
    this.contestService.getupcomingcontest().subscribe({
      next: (data) => {
        this.contests = data.map((contest: any) => {
          const utcStartTime = new Date(contest.start);
          const istStartTime = this.convertToIST(utcStartTime);
          
          return {
            ...contest,
            startTime: istStartTime,  // Use IST Time
            durationHours: (contest.duration / 3600).toFixed(0),
            timeUntilStart: this.calculateTimeUntilStart(istStartTime) // Initial value
          };
        });
  
        // Start real-time countdown updates
        this.startLiveCountdown();
      },
      error: (error) => {
        console.error('Error fetching contests:', error);
      }
    });
  }

  convertToIST(date: Date): Date {
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // +5:30 hours in milliseconds
    return new Date(date.getTime() + IST_OFFSET);
  }
  
  

  startLiveCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe(); // Clear previous interval
    }

    this.zone.runOutsideAngular(() => {
      this.countdownSubscription = interval(1000).subscribe(() => {
        let updated = false;
        this.contests.forEach(contest => {
          const newTime = this.calculateTimeUntilStart(contest.startTime);
          if (contest.timeUntilStart !== newTime) {
            contest.timeUntilStart = newTime;
            updated = true;
          }
        });

        // Update UI only if there are changes
        if (updated) {
          this.cdRef.detectChanges();
        }
      });
    });
  }

  calculateTimeUntilStart(startTime: Date): string {
    const now = new Date();
    const diffMs = startTime.getTime() - now.getTime();
    
    if (diffMs <= 0) {
      return '🚀 Started!';
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }
}
