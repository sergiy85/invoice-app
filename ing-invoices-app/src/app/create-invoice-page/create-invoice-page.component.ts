import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, forkJoin} from 'rxjs';
import { tap, map, first, switchMap } from 'rxjs/operators';

import { ProfileControlService } from './../services/profile-control.service';
import { Customer } from './../interfaces/customer';
import { Product } from './../interfaces/product';
import { Invoice } from './../interfaces/invoices';

@Component({ 
  selector: 'app-create-invoice-page',
  templateUrl: './create-invoice-page.component.html',
  styleUrls: ['./create-invoice-page.component.css']
})

export class CreateInvoicePageComponent implements OnInit {
  public title:string;
  public modeEdit:boolean;
  public invoiceID: string;
  public initForm: FormGroup;
  public existForm: FormGroup;
  public formSubmitted: boolean;
  public customers$: Observable<Customer[]>;
  public products$: Observable<Product[]>;
  public invoice: Invoice;
  public customer: string;
  public product:string;
  public discount:number;
  public quantity:number;
  public price:number;
  public invoiceItem: Array<string>;

  @Output() submitData: EventEmitter<any>;
  
  constructor(
    private profile: ProfileControlService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit() {
    this.initForm = new FormGroup({
      'customer': new FormControl("", [
        Validators.required
      ]),
      'product': new FormControl("", [
        Validators.required 
      ]),
      'discount': new FormControl(0, [
        Validators.required
      ]),
      'quantity': new FormControl(1, [
        Validators.required
      ])
    });

    this.product = '' || null;
    this.discount = 0 || null;
    this.quantity = 1 || null;
    this.price = 0 || null;
    this.invoiceItem = [];
    this.modeEdit = false;
    this.title = 'Create Invoice';
    this.submitData = new EventEmitter<FormGroup>();
    this.formSubmitted = false;
    this.invoiceID = this.activatedRoute.snapshot.params.invoice_id;
    this.invoice = {
      discount: null,
      total: null,
      customerId: null,
      id: null
    };
      
    this.customers$ = this.profile.getCustomers();
    this.products$ = this.profile.getProducts();

    if(this.invoiceID){
      this.modeEdit = true;
      this.title = 'Update Invoice';
      this.invoice.id = this.invoiceID;
      this.setInvoiceParams();
    }
    this.createNewInvoice();
  }

  public createNewInvoice(){
    this.initForm.valueChanges
      .subscribe(val =>{
        const productId = this.initForm.value.product;
        const customerId = this.initForm.value.customer;
        const discount = this.initForm.get('discount').value; 

        if(productId){
          return this.profile.getProductById(productId)
            .pipe(
              tap(product => {
                this.invoice.total = product.price,
                this.invoice.discount = discount,
                this.invoice.customerId = customerId
              }
            )
          )  
          .subscribe(
            response => {
              this.calcTotal()
            },
            error => console.error('HTTP Error', error),
            () => console.log('HTTP request completed.')
          )
        }
      })
  }

  public setInvoiceParams(){
    this.profile.getInvoiceId(this.invoiceID).pipe(first()).subscribe(invoice => {
      this.initForm.get('discount').setValue(invoice.discount);
    });

    this.profile.getCustomerById(this.invoiceID).pipe(first()).subscribe(customer => {
      this.customer = customer.name;
      this.invoice.customerId = customer.id;
      this.initForm.get('customer').setValue(customer.id);
    });

    this.profile
      .getItemById(this.invoiceID)
      .pipe(
        first(),
        switchMap(invoiceItems => {
          const mappedItems$ = invoiceItems.map(invoiceItem => {
            return this.profile.getProductById(invoiceItem.productId).pipe(
              map(product => {
                return {
                  ...invoiceItem,
                  price: product.price
                }
              })
            );
          });
          return forkJoin(mappedItems$);
        })
      )
      .subscribe(productsItems => {
        const productId = this.initForm.value.product;
        if (Array.isArray(productsItems) && productsItems.length != 0) {
          for (let item of productsItems) {
            this.initForm.get('quantity').setValue(item.quantity);
            this.initForm.get('product').setValue(item.productId);
            this.invoiceItem.push(item.productId);
            if(productId === item.productId){
              this.price = item.price;
            }
          }
        }
      });
  }
  
  public isNumber(value:any):boolean {
    return !Number.isNaN(Number(value))
  };

  public calcTotal(){
    const discount = this.initForm.get('discount').value;
    const quantity = this.initForm.get('quantity').value;
    if(!this.invoice.total){
      return this.invoice.total = this.price*this.quantity*(1 - this.discount / 100);
    }
    const price = this.invoice.total;

    if(
      price != undefined && this.isNumber(price) &&
      this.isNumber(discount) && this.isNumber(quantity) &&
      discount <= 100 && discount >= 0
      ){
      if(discount === 0 || discount === null || 
         discount === undefined || discount === ''){
        return price*quantity;
      }
      else{
        return quantity*(price - price*(discount/100));
      }

    }
  }


  public saveInvoice(){
    if(this.invoiceID){
      return this.profile.updateInvoice(this.invoiceID, this.invoice)
        .subscribe(
          response =>{
           alert('Success!');
           console.log('HTTP response', response)
         },
          error => {
            alert('Oops... Try it again please!')
            console.error('HTTP Error', error)
          },
          () => console.log('HTTP request completed.')
        );
    }
    else{
      return this.profile.addInvoice(this.invoice)
        .subscribe(
          response => {
            alert('Success!');
            console.log('HTTP response', response)
          },
          error => {
            alert('Oops... Try it again please!')
            console.error('HTTP Error', error)
          },
          () => console.log('HTTP request completed.')
        );
    }
  }

  onSubmit(form: FormGroup, isValid:boolean){
    this.formSubmitted = true;
    this.submitData.emit(this.initForm);
    this.saveInvoice();
  }
}
