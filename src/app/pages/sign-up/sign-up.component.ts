import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('f') slForm!:NgForm;

  constructor(private userser: UserService,
              private snack:MatSnackBar) { }

  public user ={
    username: '',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {
    setTimeout(()=>{

      this.slForm.setValue({
        username: this.user.username,
        password: this.user.password,
        firstName:this.user.firstName,
        lastName:this.user.lastName,
        email:this.user.email,
        phone:this.user.phone
      });

    },500)


  }


  Onsubmit(form: NgForm){
    let user= form.value;
    console.log(user);
    if(user.username == '' ,user.password == ''){
       this.snack.open('Username is Required','',{
         duration:2000,
         verticalPosition: 'top',
       })
      return;
    }

    this.userser.addUser(user).subscribe((response:any)=>{
      console.log(response);
      Swal.fire('Successfully Done !!','User Id Is :'+ response.id, 'success');
    },(error)=>{
      console.log(error);

      this.snack.open(error.message,'',{
        duration:2000,
        verticalPosition:'top'
      })
    });


  }

}
