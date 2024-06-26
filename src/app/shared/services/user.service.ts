import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName  = "Users"

  constructor(private afs: AngularFirestore) { }

  
  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getById(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  getAll() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  update(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  /*
  delete(id: string) {
    // delete all records which are connected to the actual user
    // ...
    return this.afs.collection<User>(this.collectionName).doc(id).delete;
  }
  */
  
}
