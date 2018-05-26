import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PageHomeComponent } from "./page-home.component";

@Component({ selector: "mat-spinner", template: "" }) // tslint:disable-line
class MatSpinnerComponent { }

describe("PageHomeComponent", () => {
    let component: PageHomeComponent;
    let fixture: ComponentFixture<PageHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageHomeComponent, MatSpinnerComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
