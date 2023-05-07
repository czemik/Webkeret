import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../shared/services/file.service';
import { ReportService } from '../../shared/services/report.service';
import { Report } from '../../shared/models/Report';
import { Observable, Subscription, count, first, isEmpty, map, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit{
  months: Array<Number> = [1,2,3,4,5,6,7,8,9,10,11,12];
  years: Array<Number> = [2020,2021,2022,2023,2024,2025];
  boolsub!: Subscription;
  reportForm = new FormGroup({
    amount: new FormControl(0,Validators.required),
    image: new FormControl('',Validators.required),
    year: new FormControl(0,Validators.required),
    month: new FormControl(0,Validators.required),
  });
  report!: Report;
  loading: boolean = false;
  extension?: string;

  constructor(private reportService: ReportService, private fileService: FileService, private router: Router){}

  ngOnInit(): void {
    
  }

  chooseFile(event: any){
    this.fileService.chooseFile(event);
    const file: File = event.target.files[0];
    this.extension = file.name.split('.').pop();
  }

  submit(){
    this.loading = true;
    const user: string = JSON.parse(localStorage.getItem('user') as string).uid as string;
    const name: string = +(this.reportForm.get('year')?.value || 0)+'_'+(+(this.reportForm.get('month')?.value || 0))
    this.report = {
      id: '',
      amount: +(this.reportForm.get('amount')?.value ||0),
      uid: user,
      year: +(this.reportForm.get('year')?.value || 0),
      month: +(this.reportForm.get('month')?.value || 0),
      image: {
        name: name,
        path: 'images/' + user + '/' + name,
        extension: this.extension as string
      }
    }

    let length = 0;
    const obs$ = this.reportService.reportCheck(this.report.month, this.report.year)
    const bool$ = obs$.pipe(
      map(list => list.length === 0) 
    );
    bool$.pipe(first()).subscribe(bool => {
      if(bool){
        this.create();
        
      }
      this.loading = false;
  });
  

  }
  create(){
    this.reportService.create(this.report).then(cred => {
      console.log('Successful report upload!')
      console.log(cred)
      this.loading = false;
      location.reload()
    }).catch(err => {
      console.error(err);
    })

    this.fileService.upload(this.report);
  }

  

}
