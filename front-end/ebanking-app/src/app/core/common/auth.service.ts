import {ILoginResponse, LoginInfo} from "../models/login.info";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  authenticate(loginInfo: LoginInfo): Observable<ILoginResponse> {
    let body: any = JSON.stringify(loginInfo);
    return this.http.post<ILoginResponse>('api/login', body);
  }

  isAuthenticated(): Observable<boolean> {
    return null;
  }
}
