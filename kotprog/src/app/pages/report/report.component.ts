import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../shared/services/file.service';
import { ReportService } from '../../shared/services/report.service';
import { Report } from '../../shared/models/Report';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit{
  months: Array<Number> = [1,2,3,4,5,6,7,8,9,10,11,12];
  years: Array<Number> = [2020,2021,2022,2023,2024,2025];
  reportForm = new FormGroup({
    amount: new FormControl(0,Validators.required),
    image: new FormControl('',Validators.required),
    year: new FormControl(0,Validators.required),
    month: new FormControl(0,Validators.required),
  });

  loading: boolean = false;
  extension?: string;

  constructor(private reportService: ReportService, private fileService: FileService){}

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
    const name: string = (this.reportForm.get('year')?.value as number)+'_'+(this.reportForm.get('month')?.value as number)
    const report: Report = {
      amount: this.reportForm.get('amount')?.value as number,
      uid: user,
      year: this.reportForm.get('year')?.value as number,
      month: this.reportForm.get('month')?.value as number,
      image: {
        name: name,
        path: 'images/' + user + '/' + name + '.' + this.extension as string,
        extension: this.extension as string
      }
    }
    this.reportService.create(report).then(cred => {
      console.log('Successful report upload!')
      console.log(cred)
      this.loading = false;
    }).catch(err => {
      console.error(err);
    })

    this.fileService.upload(report);


  }

  

}
