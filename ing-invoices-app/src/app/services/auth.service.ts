import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { tap } from 'rxjs/operators';

import { EnvService } from './env.service';
import { IdentityService } from './identity.service';
import { SignUpResponse } from './../interfaces/signup-response';
import { LoginResponse } from './../interfaces/login-response';
import { SignUp } from './../interfaces/signup';
import { Credentials } from './../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly onAuthStateChange$: EventEmitter<boolean>;

  public get onAuthStateChange() {
    return this.onAuthStateChange$.asObservable();
  }

  constructor(
    private http: HttpClient, 
    private identity: IdentityService, 
    private env: EnvService
  ){
    this.onAuthStateChange$ = new EventEmitter<boolean>();
  }

  public login(user:Credentials){
    return this.http.post<LoginResponse>(`${this.env.apiUrl}/ing-users/login`, user)
      .pipe(
        tap(user =>{
          this.identity.setUserId(user.userId);
          this.identity.setToken(user.id);
          this.onAuthStateChange$.emit(true);
        })
      )
  }

  public logout(){
    this.identity.removeUserId();
    this.identity.removeToken();
    this.onAuthStateChange$.emit(false);
  }

  public signUp(user:SignUp) {
    return this.http.post<SignUpResponse>(`${this.env.apiUrl}/ing-users`, user);
  }
}
