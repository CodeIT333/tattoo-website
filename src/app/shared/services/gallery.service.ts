import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Image } from '../../../app/shared/models/Image';
//import { ProfileImage } from '../../../app/shared/models/ProfileImage';
import { Observable, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  imageCollectionName = "Images";
  //ProfileImageCollectionName = "ProfileImages";

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  loadImageMeta(meta_url: string): Observable<Array<Image>>{
    return this.afs.collection<Image>(this.imageCollectionName).valueChanges();
  }

  loadImageUrl(image_url: string){
    return this.storage.ref(image_url).getDownloadURL();
  }

  loadImageByOccasionId(occasion_id: string): Observable<Image | undefined>{
    return this.afs.collection<Image>(this.imageCollectionName, ref => ref.where('occasion_id', '==', occasion_id).limit(1)).valueChanges().pipe(
      map(images => images.length > 0 ? images[0] : undefined)
    );
  }

  loadImagesByArtistName(artist_name: string) {
    return this.afs.collection<Image>(this.imageCollectionName, ref => ref.where('artist_name', '==', artist_name).orderBy('date', 'asc')).valueChanges()
  }

  loadAll() {
    return this.afs.collection<Image>(this.imageCollectionName).valueChanges();
  }

  // next feature
  /*
  loadProfileImageByUsername(username: string): Observable<ProfileImage | undefined>{
    return this.afs.collection<ProfileImage>(this.ProfileImageCollectionName, ref => ref.where('username', '==', username).limit(1)).valueChanges().pipe(
      map(images => images.length > 0 ? images[0] : undefined)
    );
  }
  */
}
