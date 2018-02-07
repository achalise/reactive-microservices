import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLayoutComponent } from './home-layout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeLayoutComponent', () => {
    let component: HomeLayoutComponent;
    let fixture: ComponentFixture<HomeLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ HomeLayoutComponent ],
                schemas: [ NO_ERRORS_SCHEMA ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
