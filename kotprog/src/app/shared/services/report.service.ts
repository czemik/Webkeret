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

  update(){

  }

  delete(){

  }



}
