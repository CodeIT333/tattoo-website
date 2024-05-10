import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../shared/models/Comment';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {

  user?: User;

  comments: Array<Comment> = []


  commentForm = this.createForm({
    id: '',
    username: '',
    comment: '',
    date: 0,
  })

  constructor(private fb: FormBuilder, private commentService: CommentService, private userService: UserService){}


  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      if (this.user && this.user.username) {
        this.commentForm.get('username')?.setValue(this.user.username);
    }
    }, error => {
      // console.log(error)
    })
  }


  createForm(model: Comment){
    let formGroup = this.fb.group(model);
    // formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.maxLength(300)]);
    return formGroup;
  }

  addComment(){
    if(this.commentForm.valid){
      if(this.commentForm.get('comment')){
        
        this.commentForm.get('date')?.setValue(new Date().getTime());

        /*
        this.commentService.create(this.commentForm.value).then(_ => {
          // ...
        }).catch(error => {
          // ignored, nem adodik hozza
        });
        */
      }
    }
  }

}
