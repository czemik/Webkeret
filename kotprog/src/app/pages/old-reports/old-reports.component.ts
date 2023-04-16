import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { OldReportsService } from '../../shared/services/old-reports.service';
import { ReportService } from '../../shared/services/report.service';
import { Image } from '../../shared/models/Image';
import { Report } from '../../shared/models/Report';
import { Observable, Observer, first, from } from 'rxjs';
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
  loadedImages?: Array<string>;
  reports?: Observable<Array<Report>>;
  asd:any;
  sub: any;
  
  constructor(private oldReportsService: OldReportsService, private reportService: ReportService, private storage: AngularFirestore){}

  ngOnDestroy(): void {
   
  }

  ngOnInit(): void {
    this.reports = this.reportService.getAll();
    this.asd = this.reports.subscribe(reports => {
      for(let i=0; i < reports.length; i++){
        this.oldReportsService.loadImage(reports[i].image.path).subscribe(sad => {
          reports[i].image.path = sad;
          console.log(reports[i].image.path);
        })
      }
    });

  }


  loadImage(path: string) {
    console.log('Image loaded?');
    let out: string = '';
    const lma = this.oldReportsService.loadImage(path).subscribe(data => {
        out = data;
        console.log(out);
        
    });
    lma.unsubscribe();
    //return  out;
  }
}
