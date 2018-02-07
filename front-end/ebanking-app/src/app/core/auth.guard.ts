import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as fromLogin from '@app/core/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import * as app from '@app/store/reducers/index';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<app.State>, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const loginstate$ = this.isLoggedIn();
        return loginstate$.take(1).catch(() => of(false));
    }

    private isLoggedIn(): Observable<boolean> {
        const loginState$ = this.store.select('authState')
            .filter(s => !!s)
            .do((s) => {
                console.log('The login state is ' + JSON.stringify(s));
                if (s.status === fromLogin.AuthStatus.UNAUTHENTICATED) {
                    console.log(`Login status is UNAUTHENTICATED, forwarding to login page`);
                    this.router.navigate([ '/login' ])
                        .then(() => {
                                console.log('Navigating to login page successful');
                            },
                            e => {
                                console.log(`Error occurred when navigating to login page ${e}`);
                            });
                }
            })
            .switchMap((s) => of(s.status === fromLogin.AuthStatus.AUTHENTICATED));
        return loginState$;
    }
}
