import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import {
    accountListResponse, configDataResponse, loginFailureResponse, loginSuccessResponse, payeeResponse,
    paymentResponse
} from './test.payloads';
import { environment } from '../../../environments/environment';
import * as fromLogin from '../models';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Intercepting the request: ${req.url}`);
        let nonMockEndPoints = [`api/accounts`, `api/login`, `api/account/`];
        if (environment.local && !nonMockEndPoints.some(s => req.url.includes(s))) {
            return new Observable(subscriber => {
                subscriber.next(this.createResponse(req));
                subscriber.complete();
            });
        } else {
            return next.handle(req).do((event: HttpEvent<any>) => {
            }, (err: HttpErrorResponse) => {
                console.log('Error status: ' + err.status);
                // do what we need here..
                // call GA event tracking ...
            });
        }
    }

    private createResponse(req: HttpRequest<any>): HttpResponse<any> {
        let rsp: HttpResponse<any>;
        const url = req.url;
        if (url === 'api/accounts') {
            rsp = new HttpResponse({
                status: 200,
                body: accountListResponse
            });
        } else if (url === 'api/configData') {
          rsp = new HttpResponse({
              status: 200,
              body: configDataResponse
          });
        } else if (url === 'api/payment') {
            rsp = new HttpResponse<any>({
                status: 200,
                body: paymentResponse
            });
        } else if (url === 'api/login') {
            rsp = this.constructLoginResponse(req);
        } else {
            rsp = new HttpResponse<any>({
                status: 200,
                body: payeeResponse
            });
        }
        return rsp;
    }

    private constructLoginResponse(req: HttpRequest<any>) {
        const loginInfo = req.body as fromLogin.LoginInfo;
        let rsp = null;
        if (loginInfo.userId !== 'testuser') {
            rsp = new HttpResponse<fromLogin.ILoginResponse>({
                status: 400,
                body: loginFailureResponse
            });
        } else {
            rsp = new HttpResponse<fromLogin.ILoginResponse>({
                status: 200,
                body: loginSuccessResponse
            });
        }
        return rsp;
    }
}



