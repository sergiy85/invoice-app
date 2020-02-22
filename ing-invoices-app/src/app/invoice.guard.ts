import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from './services/identity.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceGuard implements CanActivate {

  constructor(
    private identity: IdentityService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean>| boolean | UrlTree {
      if(!this.identity.getToken()){
        return this.router.navigate(['/login']);
      }
    return true; 
  }
}
