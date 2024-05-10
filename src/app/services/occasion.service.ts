import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Occasion } from '../shared/models/Occasion';

@Injectable({
  providedIn: 'root'
})
export class OccasionService {

  collectionName = "occasions"

  constructor(private afs: AngularFirestore) { }

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

  getAll(user_id: string){
    return this.afs.collection<Occasion>(this.collectionName, ref => ref.where('user_id', '==', user_id).orderBy('date', 'asc')).valueChanges();
  }



  
}
