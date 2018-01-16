import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavbarComponent } from './app-navbar.component';
import {NO_ERRORS_SCHEMA, DebugElement} from "@angular/core";


describe('AppNavbarComponent', () => {
  let component: AppNavbarComponent;
  let fixture: ComponentFixture<AppNavbarComponent>;
  let el:DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNavbarComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and should have the navigation links', () => {
    expect(component).toBeTruthy();
    const s = fixture.debugElement.nativeElement;
    const ts = s.querySelectorAll('a');
    expect(ts[0].text).toEqual('My Online Bank');
    expect(ts[3].textContent.trim()).toEqual('Disabled');
  });
});
