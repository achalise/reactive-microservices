import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {HttpEvent} from "@angular/common/http";
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Intercepting the request`);
    return new Observable(resp => {
      resp.next(new HttpResponse({
        status: 200,
        body: "accountlist: [{name: 'tester'}]"
      }));
      resp.complete();
    });
    // return next.handle(req);
  }
}
