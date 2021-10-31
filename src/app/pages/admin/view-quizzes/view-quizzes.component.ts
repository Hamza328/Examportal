import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any=[];

  constructor(private quiz:QuizService,
              private router:Router) { }

  ngOnInit(): void {

    this.quiz.quizzes().subscribe(data=>{
      this.quizzes=data;
    },error=>{
      console.log(error);
      Swal.fire("Error !!","Error in Loading Data !","error");
    })

  }

  deleteQuiz(id:number){

    Swal.fire({
      icon:"info",
      title:"Are your Sure",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.quiz.deleteQuiz(id).subscribe(data=>{
          this.quizzes = this.quizzes.filter((quiz:any)=> quiz.qid != id);
          // Swal.fire("Success !!","Quiz Successfully Deleted!","success");
        },error=>{
          console.log(error);
          Swal.fire("Error !!","Error in Deleting Quiz !","error");
        });

      }

    });
  }

  // viewQuestions(){
  //   this.router.navigate(['/admin/view-question'])
  // }



}
