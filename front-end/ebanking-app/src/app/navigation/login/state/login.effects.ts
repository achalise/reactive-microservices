import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@app/core/common/auth.service';
import {
    LoginActionTypes, LoginError, LoginRequest, LoginSuccess,
    LoginSuccessNavigate
} from './login.actions';
import {
    map,
    switchMap, tap,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ILoginResponse } from '@app/core/models';


@Injectable()
export class LoginEffects {
    constructor(private http: HttpClient,
                private actions$: Actions,
                private authService: AuthService,
                private router: Router) {
    }
    @Effect() login$: Observable<Action> = this.actions$.ofType(LoginActionTypes.LoginRequest).pipe(
        switchMap((action) => {
            const loginRequest = action as LoginRequest;
            return this.authService.authenticate(loginRequest.payload);
        }),
        map((loginResponse) => {
            return this.toPostLoginAction(loginResponse);
        })
    );

    @Effect() loginSuccess$: Observable<Action> = this.actions$.ofType(LoginActionTypes.LoginSuccess).pipe(
        tap(() => {
            console.log(`Login successful, routing to the dashboard page`);
            this.router.navigateByUrl('/dashboard').then(() => {
                console.log(`Naviagting to dashbpard after login success`);
            }, e => {
                console.log(`Error when navigating ..`, e);
            });
        }),
        map(() => new LoginSuccessNavigate())
    );

    private toPostLoginAction(loginResponse: ILoginResponse): LoginSuccess | LoginError {
        if (loginResponse.status === 'SUCCESS') {
            return new LoginSuccess(loginResponse);
        } else {
            return new LoginError(loginResponse);
        }

    }
}


