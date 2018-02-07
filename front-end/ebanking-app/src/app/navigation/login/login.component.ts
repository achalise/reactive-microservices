import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigDataState } from '@app/store/reducers';
import { IAuthenticationState, State } from '@app/store/reducers/index';
import { Store } from '@ngrx/store';
import { LoginRequest } from './state/login.actions';
import { LoginInfo } from '@app/core/models';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, OnDestroy {
    brandConfigLoaded$: Observable<boolean>;
    loginForm: FormGroup;

    loginStatus$: Observable<IAuthenticationState>;
    configDataStatus$: Observable<ConfigDataState>;

    constructor(private fb: FormBuilder, private store: Store<State>) {
    }

    ngOnInit() {

        this.loginStatus$ = this.store.select('authState');
        this.configDataStatus$ = this.store.select('configDataState');
        this.brandConfigLoaded$ = this.configDataStatus$.map(t => t.cssLoaded);

        this.loginForm = this.fb.group({
            userId: [ '', Validators.required ],
            password: [ '', Validators.required ]
        });
    }

    ngOnDestroy() {

    }

    submit() {
        const formValue = this.loginForm.value;
        this.store.dispatch(new LoginRequest(new LoginInfo(formValue.userId, formValue.password)));
    }
}

