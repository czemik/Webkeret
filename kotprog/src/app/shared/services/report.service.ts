import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Report } from '../models/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  collectionName: string = 'Reports';

  constructor(private afs: AngularFirestore) { }  

  create(report: Report){
    return this.afs.collection<Report>(this.collectionName).add(report);
  }

  getAll(){
    const user: string = JSON.parse(localStorage.getItem('user') as string).uid as string;
    return this.afs.collection<Report>(this.collectionName, ref => ref.where('uid', '==', user)).valueChanges();
  }

  update(){

  }

  delete(){

  }



}
