import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
    }),
    email: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
  })

  constructor(private location: Location, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.registerForm.get('email')?.value as string, this.registerForm.get('password')?.value as string).then(cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: this.registerForm.get('email')?.value as string,
        username: this.registerForm.get('email')?.value?.split('@')[0] as string,
        name: {
          firstname: this.registerForm.get('name.firstname')?.value as string,
          lastname: this.registerForm.get('name.lastname')?.value as string
        }
      };
      this.userService.create(user).then(_ => {
        // sucsessfully added to the database
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }

  goBack(){
    this.location.back();
  }
}
