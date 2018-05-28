import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material";

import { LoginBoxComponent } from "./ui/component/login-box/login-box.component";
import { UserService } from "./providers/user/user.service";
import { User } from "./typings/User";
import { Store } from "@ngrx/store";
import { AppState } from "./reducers";
import { UserState, defaultUserState } from "./reducers/user/user.reducer";
import { setSnackMsg } from "./actions/notifications/notifications.action";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    public userState: UserState;
    private snackbarRef: MatSnackBarRef<SimpleSnackBar> = null;
    constructor(public dialog: MatDialog, public userService: UserService, private _state: Store<AppState>, public snackBar: MatSnackBar) {}

    ngOnInit() {
        this._state
        .select((state: AppState) => state)
        .subscribe((state: AppState) => {
            this.userState = state.user ? state.user : defaultUserState;
            if (state.notifs) {
                if (this.snackbarRef !== null && state.notifs.snack === null) {
                    this.snackbarRef.dismiss();
                    this.snackbarRef.afterDismissed().subscribe(() => {
                        this.snackbarRef = null;
                    });
                } else if (this.snackbarRef === null && state.notifs.snack !== null) {
                    this.snackbarRef = this.snackBar.open(state.notifs.snack, "Ok", {
                        duration: 3000
                    });
                    this.snackbarRef.afterDismissed().subscribe(() => {
                        this._state.dispatch(setSnackMsg(null));
                    });
                }
            }
        });
        this.userService.restoreLocalUser();
    }

    openDialog(): void {
        if (this.userState.isIdentified || this.userState.fetching) {
            return;
        }
        const dialogRef = this.dialog.open(LoginBoxComponent, {
            id: "login-dialog-container"
        });
    }

    handleLogout(): void {
        if (!this.userState.isIdentified || this.userState.fetching) {
            return;
        }
        this.userService.logoutUser();
    }
}
