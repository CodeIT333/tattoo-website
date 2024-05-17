import { Component, OnChanges, OnInit } from '@angular/core';
import { Occasion } from '../../shared/models/Occasion';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OccasionService } from '../../shared/services/occasion.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/models/User';
import { of, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnChanges{

  user?: User;
  occasions?: Array<Occasion> = [];
  profileForm!: FormGroup;

  loading: boolean = false;


  constructor(
    private occasionService: OccasionService,
    //private fb: FormBuilder,
    private userService: UserService
  ) {
    /*
    this.profileForm = this.fb.group({
      newPassword: [''],
      confirmNewPassword: ['']
    });
    */
  }


  ngOnInit(): void {
    // get user
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.loadOccasions();
    }, error => {
      console.error(error);
    });
    /*
    this.userService.getById(user.uid).pipe(
      tap(data => {
        this.user = data;
      }),
      // get occasions
      switchMap(() => this.user ? this.occasionService.getOccasionsByUserId(this.user.id) : of([]))).subscribe(occasions => {
        this.occasions = occasions;
      }, error => {
        console.error(error);
      });
    */
   
  }


  ngOnChanges(): void {
    
    this.loadOccasions();
  }


  loadOccasions(): void {
    this.loading = true
    if(this.user){
      try {
        this.occasionService.getOccasionsByUserId(this.user.id).subscribe(occasions => {
          this.occasions = occasions;
          this.loading = false
        });
      } catch(error) {
        console.log(error);
        this.loading = false
      }
    }
  }


  /*
  changePassword(): void {
    if (this.profileForm.valid) {
      const newPassword = this.profileForm.get('newPassword').value;
      const confirmNewPassword = this.profileForm.get('confirmNewPassword').value;
      if (newPassword === confirmNewPassword) {
        // Call service method to change password
        this.authService.changePassword(newPassword).then(() => {
          this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
        }).catch(error => {
          console.error('Error changing password: ', error);
          this.snackBar.open('Failed to change password. Please try again later.', 'Close', { duration: 3000 });
        });
      } else {
        this.snackBar.open('Passwords do not match!', 'Close', { duration: 3000 });
      }
    }
  }
  */


/*
  deleteProfile(){
    if (confirm('Are you sure you want to delete your profile?')) {
      // Call service method to delete profile
      this.authService.deleteProfile().then(() => {
        this.snackBar.open('Profile deleted successfully!', 'Close', { duration: 3000 });
      }).catch((error: any) => {
        // console.error('Error deleting profile: ', error);
        this.snackBar.open('Failed to delete profile. Please try again later.', 'Close', { duration: 3000 });
      });
    }
  }
*/

}
