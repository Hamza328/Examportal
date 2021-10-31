import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css'],
})
export class ViewQuizQuestionComponent implements OnInit {
  qId: any;
  qtitle: any;
  questions: any = [];

  constructor(
    private route: ActivatedRoute,
    private question: QuestionService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.qId = this.route.snapshot.params['id'];
      this.qtitle = this.route.snapshot.params['title'];
      // console.log(this.qId + ' '+ this.qtitle);
      this.question.getQuestionsOfQuiz(this.qId).subscribe(
        (data) => {
          this.questions = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }, 30);
  }

  deletequestion(i: number) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      title: 'Are you sure',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.question.deleteQuestion(i).subscribe(
          (data) => {
            this.snack.open('Question Delete', '', {
              duration: 2000,
            });
            this.questions = this.questions.filter((q: any) => q.quesId != i);
          },
          (error) => {
            this.snack.open('Error in Deleting', '', {
              duration: 2000,
            });
          }
        );
      }
    });
  }
}
