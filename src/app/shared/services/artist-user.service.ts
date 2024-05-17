// next feature
/*
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import { ArtistUser } from '../models/ArtistUser';

@Injectable({
  providedIn: 'root'
})
export class ArtistUserService {

  collectionName  = "ArtistUser"

  constructor(private afs: AngularFirestore) { }

  getById(id: string) {
    return this.afs.collection<ArtistUser>(this.collectionName).doc(id).valueChanges();
  }

  getAll() {
    return this.afs.collection<ArtistUser>(this.collectionName).valueChanges();
  }

  update(a_user: ArtistUser) {
    return this.afs.collection<ArtistUser>(this.collectionName).doc(a_user.id).set(a_user);
  }

  delete(id: string) {
    return this.afs.collection<ArtistUser>(this.collectionName).doc(id).delete;
  }

}
*/