import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private readonly apiEndpoint: string;

  public get apiUrl(){
    return this.apiEndpoint;
  }

  constructor() {
    this.apiEndpoint = environment.apiRoot;
  }
}
