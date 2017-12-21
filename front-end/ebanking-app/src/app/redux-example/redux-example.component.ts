import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {INCREMENT, DECREMENT, RESET} from "./reducer/counter";
import {State} from "../reducers/index";

@Component({
  selector: 'app-redux-example',
  templateUrl: './redux-example.component.html',
  styleUrls: ['./redux-example.component.scss']
})
export class ReduxExampleComponent implements OnInit {

  counter: Observable<number>;

  constructor(private store: Store<State>) {
    this.counter = store.select('counter');
  }

  ngOnInit() {
  }

  increment(){
    this.store.dispatch({ type: INCREMENT });
  }

  decrement(){
    this.store.dispatch({ type: DECREMENT });
  }

  reset(){
    this.store.dispatch({ type: RESET });
  }

}
