import { ConfigData } from '@app/store/reducers/index';
import * as fromLogin from '../models';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    authenticate(loginInfo: fromLogin.LoginInfo): Observable<fromLogin.ILoginResponse> {
        const body: any = JSON.stringify(loginInfo);
        return this.http.post<fromLogin.ILoginResponse>('api/login', body);
    }

    isAuthenticated(): Observable<boolean> {
        return null;
    }
    // TODO this should be in config data service. We need to talk about the app config data management.
    retrieveConfigData(): Observable<ConfigData> {
        return this.http.get<ConfigData>('api/configData');
    }
}
