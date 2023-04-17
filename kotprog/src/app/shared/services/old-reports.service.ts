import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OldReportsService {

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  loadImage(imageUrl: string): Observable<string>{
    //console.log(imageUrl);
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  delete(url: string){
    return this.storage.storage.refFromURL(url).delete();
  }

}
