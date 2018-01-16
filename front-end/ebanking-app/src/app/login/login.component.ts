import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IAuthenticationState, State} from "../reducers";
import {Store} from "@ngrx/store";
import {LoginRequest} from "./state/login.actions";
import {LoginInfo} from "../core/models/login.info";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  protected loginForm: FormGroup;

  protected loginStatus$: Observable<IAuthenticationState>;

  constructor(private fb: FormBuilder, private store: Store<State>) { }

  ngOnInit() {

    this.loginStatus$ = this.store.select('authState');

    this.loginForm =  this.fb.group({
        userId: ['', Validators.required],
        password: ['', Validators.required]
    });


  }

  submit() {
    const formValue = this.loginForm.value;
    this.store.dispatch(new LoginRequest(new LoginInfo(formValue.userId, formValue.password)));
  }
}
