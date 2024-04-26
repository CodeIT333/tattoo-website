import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;
  
  constructor(private router: Router, private loadingService: LoadingService) { }

  async login(){
    this.loading = true;

    this.loadingObservation = this.loadingService.loadingWithObservable(this.email.value as string, this.password.value as string)
    this.loadingSubscription = this.loadingObservation
      .subscribe(
        {
          next: (data: boolean) => {
            this.router.navigateByUrl('/main');
          }, error: (error) => {
            console.error(error);
            this.loading = false;
          }, complete: () => {
            this.loading = false;
          }
        }
      )
  }
}
