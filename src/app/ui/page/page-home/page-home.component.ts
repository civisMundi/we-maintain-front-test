import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry, MatDialog } from "@angular/material";
import { Channel, defaultChannelsState } from "../../../reducers/channels/channels.reducer";
import { AppState } from "../../../reducers";
import { ChannelsService } from "../../../providers/channels/channels.service";
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

    constructor(public dialog: MatDialog, private _state: Store<AppState>, private channelsService: ChannelsService) {}

    ngOnInit() {
        this._state
            .select((state: AppState) => state)
            .subscribe((state: AppState) => {
                this.channel = state.channels ? state.channels.public : defaultChannelsState.public;
                this.userState = state.user ? state.user : defaultUserState;
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
