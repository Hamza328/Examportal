import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any=[];

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.categoryService.categories().subscribe(data=>{
        this.categories=data;
       },error=>{
         console.log(error);
         Swal.fire("Error!","Error in Loading data","error");
       });

    }, 50);

  }

}
