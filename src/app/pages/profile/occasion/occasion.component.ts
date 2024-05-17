import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from '../../../shared/models/Comment';
import { OccasionService } from '../../../shared/services/occasion.service';
import { CommentService } from '../../../shared/services/comment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Occasion } from '../../../shared/models/Occasion';
import { GalleryService } from '../../../shared/services/gallery.service';
import { User } from '../../../shared/models/User';
import { Image } from '../../../shared/models/Image';

@Component({
  selector: 'app-occasion',
  templateUrl: './occasion.component.html',
  styleUrl: './occasion.component.scss'
})
export class OccasionComponent implements OnInit, OnChanges{

  @Input() userInput?: User;
  @Input() actualOccasionInput?: Occasion;
  
  OccasionObject?: Occasion;
  comment?: Comment;
  loadedImageUrl?: string;
  loadedImage?: Image;

  loading: boolean = false;

  commentForm = this.createForm({
    id: '',
    username: this.userInput?.email as string,
    comment: '',
    date: 0,
    occasion_id: this.actualOccasionInput?.id as string
  });


  constructor(private occasionService: OccasionService, private commentService: CommentService, private fb: FormBuilder, private galleryService: GalleryService) {}


  ngOnInit(): void {
    if (this.actualOccasionInput && this.userInput) {
      // get occasion
      this.occasionService.getOccasionById(this.actualOccasionInput?.id as string).subscribe(data => {
        this.OccasionObject = data;
      });

      // get tattoo image
      this.galleryService.loadImageByOccasionId(this.actualOccasionInput?.id as string).subscribe(data => {
        if(data){
          this.loadedImage = data;
          
          this.galleryService.loadImageUrl(data.image_url).subscribe(url => {
            this.loadedImageUrl = url;
          });
          
        }
      });

      // next feature:
      // get artist's name and image
      // this.galleryService.loadProfileImageByUsername()
    }
  }


  ngOnChanges(): void {
    
    if (this.actualOccasionInput) {
      this.loadComment();
    }
  }


  loadComment() {
    this.loading = true;
    if(this.actualOccasionInput){
      try {
        this.commentService.getCommentByOccasionId(this.actualOccasionInput?.id).subscribe(comment => {
          this.comment = comment[0];
          
          this.commentForm.get('comment')?.setValue(this.comment.comment);
          this.commentForm.get('id')?.setValue(this.comment.id);
          this.commentForm.get('occasion_id')?.setValue(this.comment.occasion_id);
        });
        this.loading = false;
      } catch(error) {
        console.log(error);
        this.loading = false;
      }
    }
  }


  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    //formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(200)]);
    return formGroup;
  }


  addComment() {
    // in this case, the comment is undefined
    if (this.actualOccasionInput && this.userInput) {
      this.commentForm.get('username')?.setValue(this.userInput?.email);
      this.commentForm.get('occasion_id')?.setValue(this.actualOccasionInput?.id);

      if(this.commentForm.valid) {
        if (this.commentForm.get('comment')) {
          this.loading = true;

          this.commentForm.get('date')?.setValue(new Date().getTime());
          

          this.commentService.create(this.commentForm.value as Comment).then(_ => {
            this.loading = false;
          }).catch(error => {
            console.error(error);
            this.loading = false;
          });

        }
      }
    }
  }

  updateComment() {
    this.loading = true;

    if (this.commentForm.valid) {
      if (this.commentForm.get('comment') && this.commentForm.get('username') && this.commentForm.get('id') && this.commentForm.get('occasion_id')) {
        this.commentForm.get('date')?.setValue(new Date().getTime());   // refresh the date

        this.commentService.update(this.commentForm.value as Comment).then(_ => {
          this.loading = false;
        }).catch(error => {
          console.error(error);
          this.loading = false;
        });
      }
    }
    this.loading = false;
  }


}
