import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  loading: boolean = false;
  registerForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    rePassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    name: new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required)
    })
  });

  constructor(private location: Location, private authService: AuthService, private router: Router, private userService: UserService, private snackBar: MatSnackBar){

  }

  onSubmit(){
    this.loading = true;
    const emailReg: string = this.registerForm.get('email')?.value || '';
    const pwReg: string = this.registerForm.get('password')?.value || '';
    const pwRegRe: string = this.registerForm.get('rePassword')?.value || '';
    if(pwReg !== pwRegRe){
      let snackBarRef = this.snackBar.open('A két jelszó nem egyezik!', 'Mégse');
      this.loading = false;
      return
    } 
    this.authService.register(emailReg, pwReg).then(cred=>{
      const user: User = {
        id: cred.user?.uid as string,
        email: emailReg,
        name: {
          firstname: this.registerForm.get('name.firstname')?.value as string,
          lastname: this.registerForm.get('name.lastname')?.value as string
        }
      }
      this.userService.create(user).then(_ => {
        console.log("Successful");
        this.loading = false;
        //console.log(user);
      }).catch(err =>{
        console.error(err);
        this.loading = false;
      })
      this.router.navigateByUrl('/login');

    }).catch(err => {
      this.loading = false;
    });
  }
  goBack(){
    this.location.back();
  }



}
