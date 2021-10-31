import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  @ViewChild('f') slForm!:NgForm;
  constructor(private _category:CategoryService,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    let value=f.value;
    this._category.addCategory(value).subscribe(data=>{
      Swal.fire("Success","Category is added Successfully","success");
      f.reset();
    },error=>{
      console.log(error);
      Swal.fire("Error!!","server Error ","error");
    })

  }

}
