import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  amount = new FormControl('');
  reportForm = new FormGroup({
    amount: new FormControl(''),
    image: new FormControl(''),
  });
  loading: boolean = false;

  submit(){

  }


}
