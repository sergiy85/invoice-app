import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private userId: string;
  private userToken: string
    
  constructor(){
    this.userId = 'userID';
    this.userToken = 'userJWT'; 
  }
 
  public getToken(){
    return localStorage.getItem(this.userToken);
  }
  public getUserId(){
    return localStorage.getItem(this.userId);
  }

  public isLoggedIn() {
    return this.getToken() !== null;
  }

  public setToken(currentUserToken:string){
    return localStorage.setItem(this.userToken, currentUserToken)
  }
  public setUserId(currentUserId:string){
    return localStorage.setItem(this.userId, currentUserId)
  }

  public removeToken(){
    return localStorage.removeItem(this.userToken);
  }
  public removeUserId(){
    return localStorage.removeItem(this.userId);
  }
  
}
