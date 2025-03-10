import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const codeforcesIcon = '../../assets/Codeforces.png';
const leetcode = '../../assets/leetcode.jpg';
const gfg = '../../assets/gfg.png';
const codechef ='../../assets/codechef.png';
const atcoder = '../..assets/atcoder';
@Injectable({
  providedIn: 'root'
})
export class ContestService {
  private apiUrl = 'http://localhost:5000/api/contests';
  data:any;
  private contestIcons = new Map<string, string>([
    ["codeforces.com", "../../assets/Codeforces.png"],
    ["leetcode.com", "../../assets/leetcode.png"],
    ["geeksforgeeks.org", "../../assets/gfg.jpg"],
    ["codechef.com", "../../assets/codechef.png"],
    ["atcoder.jp", "../../assets/atcoder.png"]
  ]);
  
  constructor(private http: HttpClient) {}

  // getupcomingcontest(): Observable<any> {
  //   this.data=this.http.get(`${this.baseUrl}`);
  //   console.log(typeof  this.data);
    
  //   this.data.forEach((element:any) => {
  //     console.log(element.resource);
  //     if(element.resource){
  //       element.resource.icon = codeforcesIcon;
  //     }
      
  //   });
  //   console.log(this.data);
  //   return this.data;

  
  

  geticon(contest:string):any{
    let platform: string = contest.split('.')[0];
    // console.log(platform);
    let img
    return this.contestIcons.get(contest);
    
  }
  getupcomingcontest(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(contests =>
        contests.map(contest => ({
          ...contest,
          resource: contest.resource
            ? { ...contest.resource, icon: this.geticon(contest.resource.name) }
            : null
        }))
      )
    );
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class ContestService {
//   private apiUrl = 'http://localhost:5000/api/contests';

//   // ✅ Move the contestIcons map inside the class but as a class property
//   private contestIcons = new Map<string, string>([
//     ["codeforces.com", "../../assets/Codeforces.png"],
//     ["leetcode.com", "../../assets/leetcode.jpg"],
//     ["geeksforgeeks.org", "../../assets/gfg.png"],
//     ["codechef.com", "../../assets/codechef.png"],
//     ["atcoder.jp", "../../assets/atcoder.png"]
//   ]);

//   constructor(private http: HttpClient) {}

//   // ✅ Fix geticon method to return the correct icon
//   geticon(platform: string) {
//     return this.contestIcons.get(platform);
//   }

//   // ✅ Properly fetch contests and update resource icons
//   getupcomingcontest(): Observable<any> {
//     return this.http.get<any[]>(this.apiUrl).pipe(
//       map(contests =>
//         contests.map(contest => ({
//           ...contest,
//           resource: contest.resource
//             ? { ...contest.resource, icon: this.geticon(contest.resource.name) }
//             : { name: "Unknown", icon: "../../assets/default.png" } // Handle missing resources
//         }))
//       )
//     );
//   }
// }

