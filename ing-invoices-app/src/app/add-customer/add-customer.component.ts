import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ProfileControlService } from './../services/profile-control.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  public addCustomerForm: FormGroup;
  public formSubmitted: boolean;

  @Output() submitData: EventEmitter<any>;

  constructor(private profileControl: ProfileControlService){
    this.submitData = new EventEmitter<FormGroup>();
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.addCustomerForm = new FormGroup({
      'name': new FormControl("", [
        Validators.required
      ]),
      'address': new FormControl("", [
        Validators.required 
      ]),
      'phone': new FormControl("", [
        Validators.required,
        Validators.pattern(/^\+?(\d{2})\)?[-. ]?(\d{4})[-. ]?(\d{4})[-. ]?(\d{3,4})$/)
      ]),
    })
  }

  onSubmit(form: FormGroup, isValid:boolean){
    this.formSubmitted = true;
    this.submitData.emit(this.addCustomerForm);
    this.profileControl.addCustomer(this.addCustomerForm.value)
      .subscribe(value => console.log(value));
  }

}
