import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Occasion } from '../../shared/models/Occasion';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OccasionService {

  collectionName = "Occasions"

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  /*
  * ez mar uj feature -> a tetkosok kulon jogot kapnak, hogy kulon a weboldalon ezeket az adatokat fel tudjak vinni
  create(occasion: Occasion){
    occasion.id = this.afs.createId();
    return this.afs.collection<Occasion>(this.collectionName).doc(occasion.id).set(occasion);
  }

  update(){
    // ...
  }

  delete(){
    // ...
  }
  */

  loadComment(occasion_id: string){
    return this.afs.collection<Occasion>(this.collectionName).doc(occasion_id).valueChanges();
  }

  getOccasionsByUserId(user_id: string){
    return this.afs.collection<Occasion>(this.collectionName, ref => ref.where('user_id', '==', user_id).orderBy('date', 'asc')).valueChanges();
  }

  getOccasionById(id: string){
    return this.afs.collection<Occasion>(this.collectionName).doc(id).valueChanges();
  }
  
}
