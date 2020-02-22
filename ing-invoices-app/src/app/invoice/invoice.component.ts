import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ProfileControlService } from './../services/profile-control.service';
import { Invoice } from './../interfaces/invoices';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  public invoices$: Observable<Invoice[]>;

  constructor(
    private profile:ProfileControlService, 
    private router: Router){ 
  }
  
  ngOnInit(){
    this.invoices$ = this.profile.getInvoices();
  }

  public editInvoice(invoiceId){
    this.router.navigate(['/update-invoice', invoiceId]);
  }

  public deleteInvoice(id){
    if(confirm("Are you sure you want to delete this invoice?")){
      this.profile.removeInvoice(id).subscribe();
      setTimeout(() => location.reload(true), 1000)
    }
  }
  
}
