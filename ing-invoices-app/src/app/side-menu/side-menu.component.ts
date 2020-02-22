import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ){}
  
  public isLogout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
