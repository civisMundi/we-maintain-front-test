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
import { MainSendbird } from "../../../providers/sendbird/main.service";

@Component({
    selector: "app-page-home",
    templateUrl: "./page-home.component.html",
    styleUrls: ["./page-home.component.css"]
})
export class PageHomeComponent implements OnInit {
    public channel: Channel;
    public userState: UserState;
    public currentUserMessage: string;

    constructor(
        public dialog: MatDialog,
        private _state: Store<AppState>,
        private channelsService: ChannelsService,
        private sendbird: MainSendbird) {}

    ngOnInit() {
        this.currentUserMessage = "";
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

    isMsgValid(): boolean {
        return this.currentUserMessage.trim().length > 0;
    }

    cleanMsg() {
        this.currentUserMessage = this.currentUserMessage.trim();
    }

    sendMsg(): void {
        if (!this.isMsgValid() || this.channel.messages.isFetching) {
            return;
        }
        this.cleanMsg();
        console.log("coucou api call:: ", this.currentUserMessage);
        this.sendbird.sendMsgOnPublicChannel(this.currentUserMessage);
        this.currentUserMessage = "";
    }
}
