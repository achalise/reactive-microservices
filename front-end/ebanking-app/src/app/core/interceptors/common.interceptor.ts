import {Injectable} from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {HttpEvent} from "@angular/common/http";
import {HttpResponse} from "@angular/common/http";
import { accountListResponse } from './test.payloads';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Intercepting the request`);

        return new Observable(resp => {
          resp.next(this.createResponse(req));
          resp.complete();
        });

        //return next.handle(req);
    }

    private createResponse(req: HttpRequest<any>): HttpResponse<any> {
        let resp = new HttpResponse({
            status: 200,
            body: accountListResponse
        });
        return resp;
    }
}



