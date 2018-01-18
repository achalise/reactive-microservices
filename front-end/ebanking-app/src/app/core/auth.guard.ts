import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import * as app from "../reducer/index";
import {Store} from "@ngrx/store";
import {AuthStatus} from "./models/login.info";
import {of} from "rxjs/observable/of";
import {IAuthenticationState} from "../reducer/index";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<app.State>, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const loginstate$ = this.isLoggedIn();
        return loginstate$.take(1).catch(() => of(false));
    }

    private isLoggedIn(): Observable<boolean> {
        const loginState$ = this.store.select('authState')
            .filter(s => !!s)
            .do((s) => {
                console.log('The login state is ' + JSON.stringify(s));
                if(s.status === AuthStatus.UNAUTHENTICATED) {
                    console.log(`Login status is UNAUTHENTICATED, forwarding to login page`);
                    this.router.navigate(['/welcome/login'])
                        .then(() => {
                                console.log('Navigating to login page successful')
                            },
                            e => {
                                console.log(`Error occurred when navigating to login page ${e}`);
                            });
                }
            })
            .switchMap((s) =>  of(s.status === AuthStatus.AUTHENTICATED));
        return loginState$;
    }
}