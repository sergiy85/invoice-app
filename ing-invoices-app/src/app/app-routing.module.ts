import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CreateInvoicePageComponent } from './create-invoice-page/create-invoice-page.component';

import { InvoiceGuard } from './invoice.guard';

const routes: Routes = [
  { path: 'auth', component: AuthPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'create-invoice', component: CreateInvoicePageComponent},
  { path: 'update-invoice/:invoice_id', component: CreateInvoicePageComponent},
  { path: 'invoice', component: InvoiceComponent, canActivate: [InvoiceGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
