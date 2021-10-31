import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  // public Editor = ClassicEditor;

  qId:number=0;
  qtitle:any;
  question={
    content: '',
    image: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
        qid:0,
    }
}
  constructor(private route:ActivatedRoute,
              private _question:QuestionService) { }

  ngOnInit(): void {
    this.qId = +this.route.snapshot.params.id;
    this.qtitle =this.route.snapshot.params.title;
    console.log(this.qId);
    this.question.quiz.qid= this.qId;
  }

  formsubmit(){
    console.log(this.question);
   this._question.addQuestion(this.question).subscribe(data=>{
     Swal.fire('Success','Question Added Successfully','success');
     this.question.content='';
     this.question.answer='';
     this.question.option1='';
     this.question.option2='';
     this.question.option3='';
     this.question.option4='';

   },error=>{
    Swal.fire('Error','Error in adding question','error');
   })

  }



}
