import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public categories(){
    return  this.http.get(`${environment.baseUrl}/category/`);
  }

  public addCategory(category:any){
    return this.http.post(`${environment.baseUrl}/category/`,category);
  }

}
