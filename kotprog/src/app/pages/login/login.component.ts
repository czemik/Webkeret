import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  email = new FormControl('');
  password = new FormControl('');
  loading: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {
    
  }

  login(){
    this.loading = true;
    if (this.email.value==='kecske@kecske.hu' &&this.password.value==='kecske'){
      this.router.navigateByUrl('/main');
    }
    else{
      console.error('elirtal vmit')
    }
  }
}
