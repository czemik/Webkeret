import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    
  }

  login(){
    const emailLog: string = this.loginForm.get('email')!.value || '';
    const pwLog:string = this.loginForm.get('password')!.value || ''; 
    if(emailLog === '' || pwLog === ''){
        this.loading = false;
        this.snackBar.open("Tölts ki minden mezőt!", "Bezárás")
        return
    }
    this.loading = true;
    this.authService.login(emailLog, pwLog).then(cred => {
        this.loading = false;
        this.router.navigateByUrl('/main');
    }).catch(err => {
        this.loading = false;
        this.snackBar.open("Nem megfelelő email és jelszó kombó!", "Bezárás")
    });
  }
}
