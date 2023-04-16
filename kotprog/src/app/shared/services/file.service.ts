import { Injectable } from '@angular/core';
import { getDownloadURL, ref, uploadBytes, getStorage } from '@angular/fire/storage';
import { Report } from '../models/Report';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  file: any= {};

  constructor() { }

  storage = getStorage();

  chooseFile(event: any){
    this.file = event.target.files[0];
  }

  upload(report: Report){
    const storageRef = ref(this.storage, 'images/' + (JSON.parse(localStorage.getItem('user')as string).uid as string) + '/' + report.year +'_'+ report.month);
    uploadBytes(storageRef, this.file).then((snapshot) => {
      console.log('Uploaded a file!');
    });
   
  }

  delete(){

  }


}
