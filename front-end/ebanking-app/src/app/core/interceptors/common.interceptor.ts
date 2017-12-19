import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {HttpEvent} from "@angular/common/http";
import {HttpResponse} from "@angular/common/http";
import {Account} from "../accounts/account";

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Intercepting the request`);

    // return new Observable(resp => {
    //   resp.next(new HttpResponse({
    //       status: 200,
    //       body: {
    //         cashAccounts: [new Account('2', 'Joe Blog', 'D111188', 'CASH', 30000, 2.4)],
    //         cardAccounts: [ new Account('3', 'Joe Blog', 'E32123', 'CREDIT_CARD', 6000, 16.5) ],
    //         mortgageAccounts: [ new Account('1', 'Joe Blog', 'C123123', 'MORTGAGE', 1000, 4.5) ]
    //       }
    //   }));
    //   resp.complete();
    // });

    return next.handle(req);
  }
}
