import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  page = ""

  routes: Array<string> = [];

  constructor(private router: Router){
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
  }

  changePage(selectedPage: string){
    //this.page = selectedPage; -> mar nem kell a router miatt
    this.router.navigateByUrl(selectedPage)
  }
}
 