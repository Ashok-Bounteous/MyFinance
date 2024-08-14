// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/userauth.service'; // Adjust import path as needed

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.page.html',
//   styleUrls: ['./profile.page.scss'],
// })
// export class ProfilePage implements OnInit {
//   profile: any = {
//     name: '',
//     age: '',
//     dob: '',
//     address: '',
//     bankAccounts: []
//   };
//   totalBalance: number = 0;

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit() {
//     this.loadProfile();
//   }

//   async loadProfile() {
//     try {
//       const userProfile = this.authService.getUserProfile();
//       console.log("User profile : ",userProfile)
//       this.profile = userProfile;
//       this.totalBalance = this.calculateTotalBalance();
//     } catch (error) {
//       console.error('Error loading profile', error);
//     }
//   }

//   calculateTotalBalance() {
//     return this.profile.bankAccounts.reduce((sum: number, account: any) => sum + account.balance, 0);
//   }
//   getProfile(){}
//   editProfile() {
//     // this.router.navigate(['/edit-profile']);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/userauth.service'; // Adjust import path as needed

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any = {
    uid: '',
    email: '',
    name: '',
    dob: '',
    phoneNumber: '',
    address: {
      street: '',
      area: '',
      district: '',
      state: '',
      country: '',
      pin: ''
    },
    bankAccounts: [],
    joinedOn: '' // Added field for joined on date
  };
  
  totalBalance: number = 0;
  editMode: boolean = false; // Control for edit mode

  // Temporary fields for binding
  name: string = '';
  dob: string = '';
  phoneNumber: string = '';
  street: string = '';
  area: string = '';
  district: string = '';
  state: string = '';
  country: string = '';
  pin: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe((user) => {
      console.log(user)
      if (user && user.uid) {
        this.profile.uid = user.uid;
        this.profile.email = user.email;
        // Convert the timestamp to a Date object and then to a readable string
        const createdAtTimestamp = parseInt(user.reloadUserInfo.createdAt, 10);
        const createdAtDate = new Date(createdAtTimestamp);

        this.profile.joinedOn = createdAtDate.toLocaleString() || 'N/A'; // Convert to a readable date format

        console.log(this.profile.joinedOn); // Check the converted date in console

        this.loadProfile(user.uid);
      }
    });
  }

  loadProfile(uid: string) {
    this.authService.getProfile(uid).subscribe((userProfile) => {
      if (userProfile) {
        this.profile = { ...this.profile, ...userProfile }; // Merge the userProfile data
        this.populateTemporaryFields();
        this.totalBalance = this.calculateTotalBalance();
      }
    });
  }

  populateTemporaryFields() {
    this.name = this.profile.name || '';
    this.dob = this.profile.dob || '';
    this.phoneNumber = this.profile.phoneNumber || '';
    this.street = this.profile.address.street || '';
    this.area = this.profile.address.area || '';
    this.district = this.profile.address.district || '';
    this.state = this.profile.address.state || '';
    this.country = this.profile.address.country || '';
    this.pin = this.profile.address.pin || '';
    console.log("Input : ",this.profile);
    console.log(this.name, this.dob, this.phoneNumber, this.state, this.area, this.district, this.state, this.country, this.pin);
  }

  calculateTotalBalance(): number {
    return this.profile.bankAccounts.reduce((sum: number, account: any) => sum + account.balance, 0);
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    if (this.isProfileValid()) {
      this.profile.name = this.name;
      this.profile.dob = this.dob;
      this.profile.phoneNumber = this.phoneNumber;
      this.profile.address.street = this.street;
      this.profile.address.area = this.area;
      this.profile.address.district = this.district;
      this.profile.address.state = this.state;
      this.profile.address.country = this.country;
      this.profile.address.pin = this.pin;

      this.authService.updateProfile(this.profile.uid, this.profile)
        .then(() => {
          this.editMode = false;
          this.loadProfile(this.profile.uid); // Reload profile after saving
        })
        .catch((error) => {
          console.error('Error saving profile', error);
        });
    } else {
      console.warn('Profile is not valid');
    }
  }

  calculateAge(dob: string): number {
    if (!dob) return 0;
  
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  isProfileValid(): boolean {
    if (!this.name || this.name.length < 3) {
      return false;
    }

    if (!this.dob) {
      return false;
    }

    if (!this.phoneNumber || this.phoneNumber.length !== 10) {
      return false;
    }

    if (!this.street || !this.area || 
        !this.district || !this.state || 
        !this.country || !this.pin) {
      return false;
    }

    return true;
  }
}
