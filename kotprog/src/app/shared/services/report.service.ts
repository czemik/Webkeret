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
    report.id = this.afs.createId();
    return this.afs.collection<Report>(this.collectionName).doc(report.id).set(report);
  }

  getAll(){
    const user: string = JSON.parse(localStorage.getItem('user') as string).uid as string;
    return this.afs.collection<Report>(this.collectionName, ref => ref.where('uid', '==', user)).valueChanges();
  }

  update(id: string, newAmount: number){
    return this.afs.collection<Report>(this.collectionName).doc(id).update({amount: newAmount})
  }

  delete(id: string){
    return this.afs.collection<Report>(this.collectionName).doc(id).delete();
  }

  reportCheck(month: number, year: number){
    const user: string = JSON.parse(localStorage.getItem('user') as string).uid as string;
    return this.afs.collection<Report>(this.collectionName, ref => ref.where('uid', '==', user).where('month', '==', month).where('year', '==', year)).valueChanges();
  }

}
