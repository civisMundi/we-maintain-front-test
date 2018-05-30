import { Component, OnInit, Input, ViewChild, ElementRef, DoCheck } from "@angular/core";
import { Channel, defaultChannelsState } from "../../../reducers/channels/channels.reducer";
import { Store } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { MainSendbird } from "../../../providers/sendbird/main.service";
import { defaultUserState, UserState } from "../../../reducers/user/user.reducer";

@Component({
    selector: "app-channel-messages",
    templateUrl: "./channel-messages.component.html",
    styleUrls: ["./channel-messages.component.css"]
})
export class ChannelMessagesComponent implements OnInit, DoCheck {
    @ViewChild("scrollableWrapper") scrollableWrapper: ElementRef;
    public currentUserMessage: string;
    public previousMsgsNumber = 0;
    private firstMessagesHaveLoaded = false;
    public channel: Channel;
    public userState: UserState;

    constructor(private _state: Store<AppState>,
        private sendbird: MainSendbird) { }

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

    ngOnInit() {
        this.currentUserMessage = "";
        this._state
            .select((state: AppState) => state)
            .subscribe((state: AppState) => {
                const newMessagesNumber = state.channels ? state.channels.current.messages.data.length : 0;
                if (this.channel && newMessagesNumber > this.channel.messages.data.length) {
                    if (this.isWrapperScrolledDownEnough()) {
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

    delayScrollDown() {
        setTimeout(this.scrollToBottom.bind(this), 500);
    }

    scrollToBottom(): void {
        if (this.scrollableWrapper) {
            const el = this.scrollableWrapper.nativeElement;
            el.scrollTop = el.scrollHeight;
        }
    }

    isWrapperScrolledDownEnough(): boolean {
        if (this.scrollableWrapper) {
            const el = this.scrollableWrapper.nativeElement;
            if (el.scrollTop === 0) {
                return false;
            }
            return (el.scrollHeight - el.scrollTop) < el.parentNode.scrollHeight;
        }
        return true;
    }

    showNewMessageNotif() {
        // @TODO
        console.log("showing new message notif !");
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
}
