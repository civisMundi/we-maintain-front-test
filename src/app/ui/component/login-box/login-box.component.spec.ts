import { Component } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatDialogRef } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { LoginBoxComponent } from "./login-box.component";
import { appReducer } from "../../../reducers";
import { UserService } from "../../../providers/user/user.service";

const closeSpy = jasmine.createSpy();
class MdDialogRefMock {
    close = closeSpy;
}
const userService: Partial<UserService> = {
    noAuthLogin: jasmine.createSpy(),
};

@Component({ selector: "mat-divider", template: "" }) // tslint:disable-line
class MatDividerComponent {}

describe("LoginBoxComponent", () => {
    let component: LoginBoxComponent;
    let fixture: ComponentFixture<LoginBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
                StoreModule.forRoot(appReducer),
            ],
            declarations: [LoginBoxComponent, MatDividerComponent],
            providers: [
                { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
                { provide: MatDialogRef, useClass: MdDialogRefMock },
                { provide: UserService, useValue: userService },
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

    it("should return true on hasError - min rule", () => {
        component.form.setValue("wha");
        expect(component.hasError).toBeTruthy();
    });

    it("should return true on hasError - max rule", () => {
        component.form.setValue("failingtestsismyfckingname");
        expect(component.hasError).toBeTruthy();
    });

    it("should return true on hasError - required rule", () => {
        component.form.setValue("");
        expect(component.hasError).toBeTruthy();
    });

    it("should return false on submit with without calling userService", async () => {
        component.form.setValue("");
        const res = await component.onSubmit();
        expect(res).toBeFalsy();
        expect(userService.noAuthLogin).not.toHaveBeenCalled();
    });

    it("should return false after calling userService", async () => {
        component.form.setValue("ezfezfgreg");
        const res = await component.onSubmit();
        expect(res).toBeFalsy();
        expect(userService.noAuthLogin).toHaveBeenCalled();
    });

    it("should close dialog after api call", async () => {
        component.form.setValue("ezfezfgreg");
        const res = await component.onSubmit();
        expect(component.dialogRef.close).toHaveBeenCalled();
    });
});
