import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginserviceService } from './login/loginservice.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor( public userSer: LoginserviceService) { }

  intercept(req, next){

    // console.log('Token request');
    var tokenizedReq = req.clone({
      setHeaders : {
        myauthkey : (this.userSer.getMyToken() ?  this.userSer.getMyToken(): '')
      }
    })
    return next.handle(tokenizedReq);
  }
}
