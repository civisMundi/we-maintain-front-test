import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material";
import { Store } from "@ngrx/store";

import { LoginBoxComponent } from "./ui/component/login-box/login-box.component";
import { MainSendbird } from "./providers/sendbird/main.service";
import { UserService } from "./providers/user/user.service";
import { User } from "./typings/User";
import { AppState } from "./reducers";
import { UserState, defaultUserState } from "./reducers/user/user.reducer";
import { setSnackMsg } from "./actions/notifications/notifications.action";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
    public userState: UserState;
    private snackbarRef: MatSnackBarRef<SimpleSnackBar> = null;
    constructor(
        public dialog: MatDialog,
        public userService: UserService,
        public sendbird: MainSendbird,
        private _state: Store<AppState>,
        public snackBar: MatSnackBar) {}

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

    ngOnDestroy() {
        this.sendbird.exitCurrentChannel();
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
