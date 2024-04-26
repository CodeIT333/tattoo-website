import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'main', 
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) 
  },
  { 
    path: 'booking', 
    loadChildren: () => import('./pages/booking/booking.module').then(m => m.BookingModule) 
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
    path: 'carrier', 
    loadChildren: () => import('./pages/carrier/carrier.module').then(m => m.CarrierModule) 
  },
  { 
    path: 'introduce', 
    loadChildren: () => import('./pages/introduce/introduce.module').then(m => m.IntroduceModule) 
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
  { path: 'gallery', loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule) },
  {
    // route levedese | fontos, hogy a route legvegen legyen
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
