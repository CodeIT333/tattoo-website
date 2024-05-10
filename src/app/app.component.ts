import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  page = ""
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService){
    // parameter adattagok, amiket a konstruktorba hozunk be
  }
  /*
  // ugyan az
  router: Router;
  contructor(router: Router){
    this.router = router;
  }
  */

  ngOnInit(){

    this.routes = this.router.config.map(conf => conf.path) as string[]; // a kasztolas azert kell, mert lehet undifined is

    // pipe: fgv-eeket tudjunk meg az adatfolyamon vegrehajtani
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((events: any) => {
      // esemenyekre feliratkozas
      const currentPgae = (events.urlAfterRedirects as string).split('/')[1] as string;
      if(this.routes.includes(currentPgae)){
        this.page = currentPgae;
      }
    });
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser))
    }, error => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify(null))
      }
    )
  }

  changePage(selectedPage: string){
    //this.page = selectedPage; -> mar nem kell a router miatt
    this.router.navigateByUrl(selectedPage)
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav){
    if(event === true){
      sidenav.close();
    }
  }

  logout(_?: boolean){
    this.authService.logout().then(() => {
      console.log("logged out");
    }).catch(error => {
      console.log(error);
    })
  }
}
