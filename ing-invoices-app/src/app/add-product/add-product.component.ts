import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ProfileControlService } from './../services/profile-control.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public addProductForm: FormGroup;
  public formSubmitted: boolean;

  @Output() submitData: EventEmitter<any>;

  constructor(private profileControl: ProfileControlService) {
    this.submitData = new EventEmitter<FormGroup>();
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.addProductForm = new FormGroup({
      'name': new FormControl("", [
        Validators.required
      ]),
      'price': new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d+$/) 
      ]),
      'currency': new FormControl("", [
        Validators.required
      ]),
    })
  }

  onSubmit(form: FormGroup, isValid:boolean){
    this.formSubmitted = true;
    this.submitData.emit(this.addProductForm);
    this.profileControl.addProduct(this.addProductForm.value)
      .subscribe(value => console.log(value));
  }

}
