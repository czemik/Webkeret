import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { OldReportsService } from '../../shared/services/old-reports.service';
import { ReportService } from '../../shared/services/report.service';
import { Image } from '../../shared/models/Image';
import { Report } from '../../shared/models/Report';
import { Observable, Observer, Subscription, first, from } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getStorage } from '@angular/fire/storage';
import { OldReportsRoutingModule } from './old-reports-routing.module';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-old-reports',
  templateUrl: './old-reports.component.html',
  styleUrls: ['./old-reports.component.scss']
})
export class OldReportsComponent implements OnInit, OnDestroy{

  loadedImages = new Map<string, string>;
  reports?: Observable<Array<Report>>;
  reportSub?: Subscription;
  imageSub: Array<Subscription> = [];
  amount = new FormControl(0, Validators.required);
  updateId: string = '';
  
  constructor(private oldReportsService: OldReportsService, private reportService: ReportService, private storage: AngularFirestore){}

  ngOnDestroy(): void {
   for (let item of this.imageSub){
    item.unsubscribe();
   }
   this.reportSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.reports = this.reportService.getAll();
    this.reportSub = this.reports.subscribe(reports => {
      for(let i=0; i < reports.length; i++){
        if(this.imageSub.length !== reports.length){
          this.imageSub.push();
        }
        this.imageSub[i] = this.oldReportsService.loadImage(reports[i].image.path).subscribe(url => {

          this.loadedImages.set(reports[i].id, url)
          console.log(url);

        })
      }
    });

  }

  delete(id: string){
    this.oldReportsService.delete(this.loadedImages.get(id) || '').then(x=>console.log("SUCCESSFUL PICTURE DELETE")).catch(x=>console.log(x));
    this.reportService.delete(id).then(x=>console.log("SUCCESSFUL DELETE")).catch(x=>console.log(x));

  }

  toggleUpdate(id: string){
    console.log(id)
    console.log(this.updateId)
    if(id === this.updateId){this.updateId = ''}
    else{
      this.updateId = id;
    }
  }

  update(id: string){
    this.reportService.update(id,+(this.amount.value || 0));
  }

  getImage(id: string){
    return this.loadedImages.get(id)
  }

}
