import { Injectable, EventEmitter } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceSharedService {
  public data:string;

  // private readonly onCreateInvoiceStateChange$: EventEmitter<boolean>;

  // public get onCreateInvoiceStateChange$() {
  //   return this.onCreateInvoiceStateChange$.asObservable();
  // }

  constructor() {
    this.data = '';

  }

}
