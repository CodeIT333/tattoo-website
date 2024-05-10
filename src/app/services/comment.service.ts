import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../shared/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  collectionName = "comments"

  constructor(private afs: AngularFirestore) { }


  create(comment: Comment){
    comment.id = this.afs.createId();
    return this.afs.collection<Comment>(this.collectionName).doc(comment.id).set(comment);
    // return this.afs.collection<Comment>(this.collectionName).add(comment); //-> ekkor az id ures marad a firestore-ban
  }

  getById(id: string){
    return this.afs.collection<Comment>(this.collectionName).doc(id).valueChanges();
  }

  update(comment: Comment) {
    return this.afs.collection<Comment>(this.collectionName).doc(comment.id).set(comment);
  }

  delete(id: string) {
    return this.afs.collection<Comment>(this.collectionName).doc(id).delete;
  }

}
