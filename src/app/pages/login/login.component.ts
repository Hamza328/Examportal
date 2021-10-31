import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') slForm!:NgForm;
  constructor(private snack:MatSnackBar,
              private loginservice:LoginService,
              private Route:Router) { }

  ngOnInit(): void {
  }

  Onsubmit(f:NgForm){
    let values= f.value;
    this.loginservice.generateToken(values).subscribe((response:any)=>{


       this.loginservice.settoken(response.token);

       this.loginservice.getCurrentUser().subscribe((user:any)=>{
        this.loginservice.setUser(user);
        if( this.loginservice.getUserRole() == 'Admin'){
          this.Route.navigate(['admin']);
          this.loginservice.loginStatusSubject.next(true);

        }else if(this.loginservice.getUserRole() == 'Normal'){
          this.Route.navigate(['user/0']);
          this.loginservice.loginStatusSubject.next(true);

        }else{
          this.loginservice.logout();
        }
       })


    },(error)=>{
      this.snack.open("Invalid Detail !! Try again",'',{
        duration:2000,
      });
    })


  }

}
