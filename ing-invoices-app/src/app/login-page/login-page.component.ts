import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from './../services/auth.service';
import { IdentityService } from './../services/identity.service';
import { ProfileControlService } from './../services/profile-control.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;
  public formSubmitted: boolean;

  @Output() submitData: EventEmitter<any>;

  constructor(
    private auth: AuthService,
    private identity: IdentityService,
    private profileControl: ProfileControlService,
    private router: Router
  ){
    this.submitData = new EventEmitter<FormGroup>();
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl("", [
        Validators.required, 
        Validators.email
      ]),
      'password': new FormControl("", [
        Validators.required, 
        Validators.minLength(8)
      ])
    })
  }

  onSubmit(form: FormGroup, isValid:boolean){
    this.formSubmitted = true;
    this.submitData.emit(this.loginForm);
    this.auth.login(this.loginForm.value)
      .subscribe(
        response => {
          console.log(response);
          return this.router.navigate(['/invoice'])
        },
        error => alert('You are unauthorized! Try again.'),
        () => console.log('HTTP request completed.')
      );

    if(isValid){
      this.formSubmitted = false;
    } 
  }

}
