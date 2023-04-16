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

@Component({
  selector: 'app-old-reports',
  templateUrl: './old-reports.component.html',
  styleUrls: ['./old-reports.component.scss']
})
export class OldReportsComponent implements OnInit, OnDestroy{

  @Input() imageInput?: Image;
  loadedImages: Array<[Report, string]> = [];
  reports?: Observable<Array<Report>>;
  reportSub?: Subscription;
  imageSub: Array<Subscription> = [];
  
  constructor(private oldReportsService: OldReportsService, private reportService: ReportService, private storage: AngularFirestore){}

  ngOnDestroy(): void {
   
   this.reportSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.reports = this.reportService.getAll();

    this.reportSub = this.reports.subscribe(reports => {
      for(let i=0; i < reports.length; i++){
        if(this.imageSub.length !== reports.length){
          this.imageSub.push();
        }
        this.imageSub[i] = this.oldReportsService.loadImage(reports[i].image.path).subscribe(sad => {
          if(reports.length === this.loadedImages.length){
            this.loadedImages[i][0] = reports[i];
            this.loadedImages[i][1] = sad;
          }
          else{
            this.loadedImages.push([reports[i],sad]);
          }
          
          console.log(sad);
        })
      }
    });

  }

  getImage(report: Report){
    for (let item of this.loadedImages){
        if (item[0].image.path === report.image.path){
            console.log(item[1])
            return item[1];
        }
    }
    return 'sad';
  }

}
