import {Injectable} from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {HttpEvent} from "@angular/common/http";
import {HttpResponse} from "@angular/common/http";
import {
    accountListResponse, loginFailureResponse, loginSuccessResponse, payeeResponse,
    paymentResponse
} from './test.payloads';
import {environment} from "../../../environments/environment";
import {ILoginResponse, LoginInfo} from "../models/login.info";

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Intercepting the request`);

        if(environment.local) {
            return new Observable(resp => {
                resp.next(this.createResponse(req));
                resp.complete();
            });
        } else {
            return next.handle(req);
        }
    }

    private createResponse(req: HttpRequest<any>): HttpResponse<any> {
        let rsp: HttpResponse<any>;
        const url = req.url;
        if(url === 'api/accounts') {
            rsp = new HttpResponse({
                status: 200,
                body: accountListResponse
            });
        } else if(url === 'api/pay') {
            rsp = new HttpResponse<any>({
                status: 200,
                body: paymentResponse
            });
        } else if(url === 'api/login') {
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
        const loginInfo = JSON.parse(req.body) as LoginInfo;
        let rsp = null;
        if (loginInfo.userId != 'testuser') {
            rsp = new HttpResponse<ILoginResponse>({
                status: 400,
                body: loginFailureResponse
            });
        } else {
            rsp = new HttpResponse<ILoginResponse>({
                status: 200,
                body: loginSuccessResponse
            });
        }
        return rsp;
    }
}



