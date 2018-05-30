import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MatDialog } from "@angular/material";
import { Channel, defaultChannelsState } from "../../../reducers/channels/channels.reducer";
import { AppState } from "../../../reducers";
import { defaultUserState, UserState } from "../../../reducers/user/user.reducer";
import { LoginBoxComponent } from "../../component/login-box/login-box.component";

@Component({
    selector: "app-page-home",
    templateUrl: "./page-home.component.html",
    styleUrls: ["./page-home.component.css"]
})
export class PageHomeComponent implements OnInit {
    public channel: Channel;
    public userState: UserState;

    constructor(public dialog: MatDialog, private _state: Store<AppState>) {}

    ngOnInit() {
        this._state
            .select((state: AppState) => state)
            .subscribe((state: AppState) => {
                this.channel = state.channels ? state.channels.current : defaultChannelsState.current;
                this.userState = state.user || defaultUserState;
            });
    }

    openDialog(): void {
        if (this.userState.isIdentified || this.userState.fetching) {
            return;
        }
        const dialogRef = this.dialog.open(LoginBoxComponent, {
            id: "login-dialog-container"
        });
    }
}
