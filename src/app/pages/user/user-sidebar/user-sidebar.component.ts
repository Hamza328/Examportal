import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories:any=[];
  constructor(private _category:CategoryService,
              private snack:MatSnackBar) { }

  ngOnInit(): void {

    this._category.categories().subscribe(data=>{
      this.categories=data;
    },error=>{
      this.snack.open('Error in getting categories','',{
        duration:3000,
      });
    })

  }

}
