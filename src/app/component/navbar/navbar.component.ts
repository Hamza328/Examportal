import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {

  isLogedIn:boolean=false
  user:any=null;
  subscription!:Subscription;

  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(public login:LoginService,
              private route:Router){

  }

  ngOnInit(){
    this.isLogedIn =this.login.isLogedIn();
    this.user=this.login.getUser();
    this.subscription= this.login.loginStatusSubject.subscribe(data=>{
      this.isLogedIn =this.login.isLogedIn();
      this.user=this.login.getUser();
    })

  }

  toggleSideNav(){
    this.sidenav.toggle();
  }
  logout(){
    this.login.logout();
    this.login.loginStatusSubject.next(false);
    this.route.navigate(['login']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
