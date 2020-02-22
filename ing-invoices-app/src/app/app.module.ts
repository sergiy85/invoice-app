import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { EnvService } from './services/env.service';
import { IdentityService } from './services/identity.service';
import { ProfileControlService } from './services/profile-control.service';
import { AuthService } from './services/auth.service';
import { InvoiceSharedService } from './services/invoice-shared.service';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceGuard } from './invoice.guard';
import { CreateInvoicePageComponent } from './create-invoice-page/create-invoice-page.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    InvoiceComponent,
    CreateInvoicePageComponent,
    SideMenuComponent,
    AddCustomerComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [
    EnvService, 
    IdentityService,
    ProfileControlService, 
    AuthService,
    CreateInvoicePageComponent,
    InvoiceGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
