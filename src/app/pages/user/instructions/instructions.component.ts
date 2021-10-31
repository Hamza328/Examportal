import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:number =0;
  quiz:any=[];
  constructor(private route:ActivatedRoute,
              private _quiz:QuizService,
              private router:Router,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.qid= this.route.snapshot.params.qId;
    console.log(this.qid);
    setTimeout(() => {
      this._quiz.getQuiz(this.qid).subscribe(data=>{
        this.quiz=data;
      },error=>{
        console.log(error);
      });
    }, 100);
  }

  startquiz(){

    Swal.fire({
      icon:'info',
      title:'Do you want to start the quiz?',
      showCancelButton:true,
      confirmButtonText:'Start',

    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/start/'+ this.qid]);
      }
    });

  }


}
