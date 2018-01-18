import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromAccountComponent } from './from-account.component';

xdescribe('FromAccountComponent', () => {
  let component: FromAccountComponent;
  let fixture: ComponentFixture<FromAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
