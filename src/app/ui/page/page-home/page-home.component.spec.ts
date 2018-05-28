import { Component } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { PageHomeComponent } from "./page-home.component";
import { appReducer } from "../../../reducers";
import { MatDialog } from "@angular/material";

const matDialog: Partial<MatDialog> = {
    open: jasmine.createSpy(),
};

@Component({ selector: "mat-spinner", template: "" }) // tslint:disable-line
class MatSpinnerComponent { }

@Component({ selector: "mat-icon", template: "" }) // tslint:disable-line
class MatIconComponent { }

describe("PageHomeComponent", () => {
    let component: PageHomeComponent;
    let fixture: ComponentFixture<PageHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PageHomeComponent,
                MatSpinnerComponent,
                MatIconComponent,
            ],
            imports: [
                StoreModule.forRoot(appReducer),
                MatInputModule,
                ReactiveFormsModule,
                FormsModule,
            ],
            providers: [
                { provide: MatDialog, useValue: matDialog },
            ]
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
