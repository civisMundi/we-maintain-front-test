import { Component, OnInit, OnDestroy, ElementRef, ViewChild, OnChanges, DoCheck } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry, MatDialog } from "@angular/material";
import { Channel, defaultChannelsState } from "../../../reducers/channels/channels.reducer";
import { AppState } from "../../../reducers";
import { defaultUserState, UserState } from "../../../reducers/user/user.reducer";
import { LoginBoxComponent } from "../../component/login-box/login-box.component";
import { MainSendbird } from "../../../providers/sendbird/main.service";

@Component({
    selector: "app-page-home",
    templateUrl: "./page-home.component.html",
    styleUrls: ["./page-home.component.css"]
})
export class PageHomeComponent implements OnInit, OnDestroy, DoCheck {
    public channel: Channel;
    public userState: UserState;
    public currentUserMessage: string;
    @ViewChild("scrollableWrapper") scrollableWrapper: ElementRef;
    public previousMsgsNumber = 0;
    private firstMessagesHaveLoaded = false;

    constructor(
        public dialog: MatDialog,
        private _state: Store<AppState>,
        private sendbird: MainSendbird) {}

    ngOnInit(): void {
        this.currentUserMessage = "";
        this._state
            .select((state: AppState) => state)
            .subscribe((state: AppState) => {
                const newMessagesNumber = state.channels ? state.channels.current.messages.data.length : 0;
                if (this.channel && newMessagesNumber > this.channel.messages.data.length) {
                    if (this.isWrapperScrolledDown()) {
                        this.delayScrollDown();
                    } else {
                        if (this.firstMessagesHaveLoaded) {
                            this.showNewMessageNotif();
                        }
                    }
                }
                this.channel = state.channels ? state.channels.current : defaultChannelsState.current;
                this.userState = state.user ? state.user : defaultUserState;
            });
    }

    isWrapperScrolledDown(): boolean {
        if (this.scrollableWrapper) {
            const el = this.scrollableWrapper.nativeElement;
            return el.scrollHeight - el.scrollTop < 450;
        }
        return true;
    }

    showNewMessageNotif() {
        // @TODO
        console.log("showing new message notif !");
    }

    scrollToBottom(): void {
        if (this.scrollableWrapper) {
            const el = this.scrollableWrapper.nativeElement;
            el.scrollTop = el.scrollHeight;
        }
    }

    delayScrollDown() {
        setTimeout(this.scrollToBottom.bind(this), 500);
    }

    ngDoCheck(): void {
        if (!this.channel) {
            return;
        }
        if (this.previousMsgsNumber === 0 && this.channel.messages.data.length > 0 && this.userState.isIdentified) {
            this.previousMsgsNumber = this.channel.messages.data.length;
            this.delayScrollDown();
            this.firstMessagesHaveLoaded = true;
        }
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

    sendMsg() {
        if (!this.isMsgValid() || this.channel.messages.isFetching) {
            return;
        }
        this.cleanMsg();
        const msgIsSent = this.sendbird.sendMsgOnCurrentChannel(this.currentUserMessage);
        this.currentUserMessage = "";
    }

    ngOnDestroy(): void {
        // this.sendbird.leaveChannel()
    }
}
