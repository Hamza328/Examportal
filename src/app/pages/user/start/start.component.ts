import { LocationStrategy } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qId: number = 0;
  questions: any;

  marksgot = 0;
  correctAnswer = 0;
  attempted = 0;
  issubmit = false;
  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventbackbutton();
    this.qId = this.route.snapshot.params.qid;
    setTimeout(() => {
      this.loadQuestion(this.qId);
    }, 50);
  }

  preventbackbutton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  loadQuestion(id: number) {
    this._question.getQuestionsOfQuizfortest(id).subscribe(
      (data) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;

        console.log(this.questions);
        this.starttimer();
      },
      (error) => {
        Swal.fire('Error', 'Error in Loading Question', 'error');
      }
    );
  }

  submitQuiz() {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to Submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  starttimer() {
    let t = setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let min = Math.floor(this.timer / 60);
    let ss = this.timer - min * 60;
    return `${min}min: ${ss}sec`;
  }

  evalQuiz() {
    // this.questions.forEach((q:any) => {
    //   if(q.givenAnswer == q.answer){
    //     this.correctAnswer++;
    //     let markssingle =this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksgot += markssingle;
    //   }
    //   if(q.givenAnswer.trim() !=''){
    //     this.attempted++;
    //   }
    // });
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        this.correctAnswer = data.correctAnswer;
        this.marksgot = data.marksgot;
        this.attempted = data.attempted;
        console.log(data);
        this.issubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  print() {
    window.print();
  }
}
