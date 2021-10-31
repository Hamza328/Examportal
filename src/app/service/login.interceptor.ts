import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private loginservice:LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     const token =this.loginservice.getToken();
    //  console.log(token);
     if(token != null){
      request=request.clone({
         setHeaders:{ Authorization : `Bearer ${token}`}
        });
     }

    return next.handle(request);
  }
}


