import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EnvService } from './env.service';
import { IdentityService } from './identity.service';
import { Invoice } from './../interfaces/invoices';
import { Product } from './../interfaces/product';
import { Customer } from './../interfaces/customer';
import {InvoiceItem} from './../interfaces/invoice-item';

@Injectable({
  providedIn: 'root'
})

export class ProfileControlService {
  public token:string;
  public header: HttpHeaders;
  
  constructor(
    private identity: IdentityService,
    private http: HttpClient,
    private env: EnvService
   ){
    this.token = this.identity.getToken();
    this.header = new HttpHeaders({
      'Authorization': this.token
    });
  }

  public getInvoices(){
    const url = `${this.env.apiUrl}/invoices`;
    return this.http.get<Invoice[]>(url, {headers: this.header});
  }

  public getInvoiceId(id){
    const url = `${this.env.apiUrl}/invoices/${id}`;
    return this.http.get<Invoice>(url, {headers: this.header});
  }

  public getCustomerById(id){
    const url = `${this.env.apiUrl}/invoices/${id}/customer?access_token=${this.token}`;
    return this.http.get<Customer>(url, {headers: this.header});
  }

  public getProducts(){
    const url = `${this.env.apiUrl}/products`;
    return this.http.get<Product[]>(url, {headers: this.header});
  }

  public getItemById(id){
    const url = `${this.env.apiUrl}/invoices/${id}/items?access_token=${this.token}`;
    return this.http.get<InvoiceItem[]>(url, {headers: this.header});
  }

  public getCustomers(){
    const url = `${this.env.apiUrl}/customers`;
    return this.http.get<Customer[]>(url, {headers: this.header});
  }

  public getProductById(id) {
    const url = `${this.env.apiUrl}/products/${id}?access_token=${this.token}`;
    return this.http.get<Product>(url, {headers: this.header})
  }

  public getCustomer(id) {
    const url = `${this.env.apiUrl}/customers/${id}`;
    return this.http.get<Customer>(url, {headers: this.header})
  }

  public addProduct(value){
    const url = `${this.env.apiUrl}/products?access_token=${this.token}`;
    return this.http.post<Product>(url, value);
  }

  public addCustomer(value){
    const url = `${this.env.apiUrl}/customers?access_token=${this.token}`;
    return this.http.post<Customer>(url, value);
  }

  public addInvoice(value){
    const url = `${this.env.apiUrl}/invoices?access_token=${this.token}`;
    return this.http.post<Invoice>(url, value);
  }

  public updateInvoice(id, value){
    const url = `${this.env.apiUrl}/invoices/${id}?access_token=${this.token}`;
    return this.http.put<Invoice>(url, value);
  }

  public removeInvoice(id) {
    const url = `${this.env.apiUrl}/invoices/${id}`;
    return this.http.delete<any>(url, {headers: this.header});
  }

}
