import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { 
    path: 'main', 
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) 
  },
  { 
    path: 'booking', 
    loadChildren: () => import('./pages/booking/booking.module').then(m => m.BookingModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'gallery', 
    loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule) 
  },
  { 
    path: 'not-found', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  {
    // alapbol a main-re
    path: '', 
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { 
    path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule) 
  },
  {
    // route levedese | fontos, hogy a route legvegen legyen
    path: '**',
    redirectTo: '/not-found'
  }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // scrolls to top
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
