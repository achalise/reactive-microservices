import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAccountComponent } from './to-account.component';

xdescribe('ToAccountComponent', () => {
    let component: ToAccountComponent;
    let fixture: ComponentFixture<ToAccountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ ToAccountComponent ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
