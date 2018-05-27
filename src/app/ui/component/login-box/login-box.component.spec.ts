import { Component } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { LoginBoxComponent } from "./login-box.component";

@Component({ selector: "mat-divider", template: "" }) // tslint:disable-line
class MatDividerComponent {}

describe("LoginBoxComponent", () => {
    let component: LoginBoxComponent;
    let fixture: ComponentFixture<LoginBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule],
            declarations: [LoginBoxComponent, MatDividerComponent],
            providers: [
                { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should return false on hasError", () => {
        component.form.setValue("whatsmyname");
        expect(component.hasError).toBeFalsy();
    });

    it("should return true on hasError", () => {
        component.form.setValue("wha");
        expect(component.hasError).toBeTruthy();
    });

    it("should return true on hasError", () => {
        component.form.setValue("failingtestsismyfckingname");
        expect(component.hasError).toBeTruthy();
    });

    it("should return true on hasError", () => {
        component.form.setValue("");
        expect(component.hasError).toBeTruthy();
    });

    it("should return true on hasError", () => {
        component.form.setValue("");
        expect(component.onSubmit()).toBeFalsy();
    });
});
