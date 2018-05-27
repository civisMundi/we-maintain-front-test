import { Component, Injectable } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "./providers/user/user.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { appReducer } from "./reducers";



const matDialog: Partial<MatDialog> = {
    open: jasmine.createSpy(),
};
const userService: Partial<UserService> = {
    noAuthLogin: jasmine.createSpy(),
    restoreLocalUser: jasmine.createSpy(),
    storeUserId: jasmine.createSpy(),
};

@Component({ selector: "router-outlet", template: "" }) // tslint:disable-line
class RouterOutletComponent { }
@Component({ selector: "mat-drawer", template: "" }) // tslint:disable-line
class MatDrawerComponent { }
@Component({ selector: "mat-drawer-container", template: "" }) // tslint:disable-line
class MatDrawerContainerComponent { }
@Component({ selector: "mat-nav-list", template: "" }) // tslint:disable-line
class MatNavListComponent { }
@Component({ selector: "mat-toolbar", template: "" }) // tslint:disable-line
class MatToolbarComponent { }
@Component({ selector: "mat-toolbar-row", template: "" }) // tslint:disable-line
class MatToolbarRowComponent { }
@Component({ selector: "mat-icon", template: "" }) // tslint:disable-line
class MatIconComponent { }
@Component({ selector: "app-login-box", template: "" })
class LoginBoxComponent { }
@Component({ selector: "app-page-home", template: "" })
class PageHomeComponent { }
@Component({ selector: "mat-divider", template: "" }) // tslint:disable-line
class MatDividerComponent { }

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatProgressSpinnerModule,
                MatMenuModule,
                StoreModule.forRoot(appReducer),
                MatSnackBarModule,
            ],
            declarations: [
                AppComponent,
                PageHomeComponent,
                LoginBoxComponent,
                MatToolbarComponent,
                MatToolbarRowComponent,
                RouterOutletComponent,
                MatIconComponent,
                MatNavListComponent,
                MatDrawerComponent,
                MatDrawerContainerComponent,
                MatDividerComponent,
            ],
            providers: [
                { provide: MatDialog, useValue: matDialog},
                { provide: UserService, useValue: userService},
            ]
        }).compileComponents();
    }));
    it("should create the app", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should open dialog`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const comp = fixture.debugElement.componentInstance;
        comp.userState = {};
        const app = comp.openDialog();
        expect(matDialog.open).toHaveBeenCalled();
    }));
    it("should instantiate mat-toolbar", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("mat-toolbar")).toBeTruthy();
    }));
    it("should instantiate a mat-drawer-container", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("mat-drawer-container")).toBeTruthy();
    }));
    it("should instantiate a footer", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("footer")).toBeTruthy();
    }));
});
