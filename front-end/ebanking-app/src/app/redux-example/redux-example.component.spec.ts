import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxExampleComponent } from './redux-example.component';

describe('ReduxExampleComponent', () => {
  let component: ReduxExampleComponent;
  let fixture: ComponentFixture<ReduxExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduxExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
