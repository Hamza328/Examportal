import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:number=-1;
  quezzes:any=[];

  constructor(private route:ActivatedRoute,
              private _quiz:QuizService) { }

  ngOnInit(): void {
    // this.catId =this.route.snapshot.params.catId;

    this.route.params.subscribe(params=>{
       this.catId= params.catId;
       if(this.catId == 0){
        this._quiz.getActiveQuizes().subscribe(data=>{
          this.quezzes= data;

        },error=>{
          console.log(error);
        })

      }else{
        this._quiz.getactivequizesOfCategory(this.catId).subscribe(data=>{
          this.quezzes=data;
        },error=>{
          console.log(error);
        });

      }
    });



  }

}
