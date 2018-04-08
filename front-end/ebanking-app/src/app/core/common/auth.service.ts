import { ConfigData } from '@app/store/reducers/index';
import * as fromLogin from '../models';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var Fingerprint2: any;

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    authenticate(loginInfo: fromLogin.LoginInfo): Observable<fromLogin.ILoginResponse> {
        return this.generateSignature().switchMap(fingerPrint => {
            loginInfo.fingerPrint = fingerPrint;
            return this.http.post<fromLogin.ILoginResponse>('api/login', loginInfo);
        });
    }

    isAuthenticated(): Observable<boolean> {
        return null;
    }
    // TODO this should be in config data service. We need to talk about the app config data management.
    retrieveConfigData(): Observable<ConfigData> {
        return this.http.get<ConfigData>('api/configData');
    }

    private generateSignature(): Observable<string> {
        return Observable.create(observer => {
            new Fingerprint2().get((res, components) => {
                observer.next(res);
                observer.complete();
            });
        });
    }
}
