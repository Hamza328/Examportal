import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  editMode: boolean = false;
  categories: any;
  QuizData: any;
  QuizId: number = 0;
  @ViewChild('f') slForm!: NgForm;
  constructor(
    private _category: CategoryService,
    private quiz: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.route.params.subscribe((param) => {
        this.editMode = param['id'] != null;
        this.QuizId = param['id'];
        console.log(this.editMode);
        console.log(this.QuizId);
      });

      if (this.editMode == true) {
        this.quiz.getQuiz(this.QuizId).subscribe(
          (data) => {
            this.QuizData = data;
            console.log(this.QuizData);

            this.slForm.setValue({
              qid: this.QuizData.qid,
              title: this.QuizData.title,
              description: this.QuizData.description,
              maxMarks: this.QuizData.maxMarks,
              numberOfQuestions: this.QuizData.numberOfQuestions,
              category: this.QuizData.category,
              active: this.QuizData.active,
            });
          },
          (errpr) => {
            Swal.fire('Error!!', 'Error In Loading Quiz ', 'error');
          }
        );
      }
      this._category.categories().subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.log(error);
          Swal.fire('Error!!', 'Error In Loading Data ', 'error');
        }
      );
    }, 50);
  }

  onSubmit(f: NgForm) {
    let value = f.value;
    console.log(value);
    if (this.editMode) {
      this.quiz.updateQuiz(value).subscribe(
        (data) => {
          Swal.fire('Success', 'Quiz is Update Successfully', 'success').then(
            (e) => {
              f.reset();
              this.router.navigate(['/admin/view-quizzes']);
            }
          );
        },
        (error) => {
          console.log(error);
          Swal.fire(
            'Error!!',
            'Error while uploading quiz to Server ',
            'error'
          );
        }
      );
    } else {
      this.quiz.addQuiz(value).subscribe(
        (data) => {
          Swal.fire('Success', 'Quiz is added Successfully', 'success').then(
            (e) => {
              f.reset();
            }
          );
        },
        (error) => {
          console.log(error);
          Swal.fire(
            'Error!!',
            'Error while uploading quiz to Server ',
            'error'
          );
        }
      );
    }
  }
}
