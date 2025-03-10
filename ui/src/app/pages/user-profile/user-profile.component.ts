import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

  platforms = [
    { name: 'LeetCode', selected: false },
    { name: 'Codeforces', selected: false },
    { name: 'CodeChef', selected: false },
    { name: 'AtCoder', selected: false },
    { name: 'HackerRank', selected: false }
  ];

  togglePlatform(platform: any) {
    platform.selected = !platform.selected;
  }

  savePreferences() {
    const selectedPlatforms = this.platforms.filter(p => p.selected).map(p => p.name);
    console.log('Selected Platforms:', selectedPlatforms);
    // Here, you can send the selected platforms to the backend to update the database
  }
}
