import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { CommentComponent } from './comment/comment.component';
import { OccasionComponent } from './occasion/occasion.component';


@NgModule({
  declarations: [
    ProfileComponent,
    CommentComponent,
    OccasionComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
