import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

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

  constructor(private location: Location) { }


  onSubmit(){

  }

  goBack(){
    this.location.back();
  }
}
