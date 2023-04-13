import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  email = new FormControl('');
  password = new FormControl('');
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    
  }

  login(){
    const emailLog: string = this.email.value || '';
    const pwLog:string = this.password.value || ''; 
    this.loading = true;
    this.authService.login(emailLog, pwLog).then(cred => {
        this.loading = false;
        this.router.navigateByUrl('/main');
    }).catch(err => {
        this.loading = false;
        console.error("Invalid");
    });
  }
}
