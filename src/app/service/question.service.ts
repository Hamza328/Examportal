import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  getQuestionsOfQuiz(qid:number){
   return this.http.get(`${environment.baseUrl}/question/quiz/all/${qid}`);
  }

  addQuestion(question:any){
    return this.http.post(`${environment.baseUrl}/question/`,question);
  }

  deleteQuestion(id:number){
    return this.http.delete(`${environment.baseUrl}/question/${id}`);
  }

  getQuestionsOfQuizfortest(qid:number){
    return this.http.get(`${environment.baseUrl}/question/quiz/${qid}`);
   }

  evalQuiz(questions:any){
    return this.http.post(`${environment.baseUrl}/question/eval-quiz/`,questions);
  }

}
