import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { LoginBoxComponent } from "./ui/component/login-box/login-box.component";
import { UserService } from "./providers/user/user.service";
import { User } from "./typings/User";
import { Store } from "@ngrx/store";
import { AppState } from "./reducers";
import { UserState, defaultUserState } from "./reducers/user/user.reducer";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    public userState: UserState;
    constructor(public dialog: MatDialog, public userService: UserService, private _state: Store<AppState>) {}

     ngOnInit() {
         this._state
            .select((state: AppState) => state)
            .subscribe((state: AppState) => {
                this.userState = state.user ? state.user : defaultUserState;
            });
         this.userService.restoreLocalUser();
     }

    openDialog(): void {
        if (this.userState.isIdentified || this.userState.fetching) {
            return;
        }
        const dialogRef = this.dialog.open(LoginBoxComponent, {
            height: "100%",
            maxHeight: "250px",
            width: "100%",
            maxWidth: "300px",
        });
    }
}
