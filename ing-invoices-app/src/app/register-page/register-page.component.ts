import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  public signUp: FormGroup;
  public formSubmitted: boolean;

  @Output() submitData: EventEmitter<any>;

  constructor(private auth: AuthService) { 
    this.submitData = new EventEmitter<FormGroup>();
    this.formSubmitted = false; 
  }
  
  ngOnInit() {

    this.signUp = new FormGroup({
      'name': new FormControl("", [
        Validators.required
      ]),
      'email': new FormControl("", [
        Validators.required, 
        Validators.email
      ]),
      'password': new FormControl("", [
        Validators.required, 
        Validators.minLength(8)
      ]),
      'dob': new FormControl("", [
        Validators.required,
        Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
      ])
    })
  }

  onSubmit(form: FormGroup, isValid:boolean){
    this.formSubmitted = true;
    this.submitData.emit(this.signUp);
    this.auth.signUp(this.signUp.value)
      .subscribe(value => console.log(value));

    if(isValid){
    this.formSubmitted = false;
    } 
  }

}

