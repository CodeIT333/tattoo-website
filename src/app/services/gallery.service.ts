import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Image } from '../../app/shared/models/Image';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  // Http

  collectionName = "Images" 

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) {}

  loadImageMeta(metaUrl: string): Observable<Array<Image>>{
    return this.afs.collection<Image>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string){
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
