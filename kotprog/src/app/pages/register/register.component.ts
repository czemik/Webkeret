import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common'
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private location: Location, private authService: AuthService, private router: Router, private userService: UserService){

  }

  onSubmit(){
    console.log(this.registerForm.value)
    const emailReg: string = this.registerForm.get('email')?.value || '';
    const pwReg: string = this.registerForm.get('password')?.value || '';
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
        console.log(user);
      }).catch(err =>{
        console.error(err);
      })
      //this.router.navigateByUrl('/login');

    }).catch(err => {

    });
  }
  goBack(){
    this.location.back();
  }



}
