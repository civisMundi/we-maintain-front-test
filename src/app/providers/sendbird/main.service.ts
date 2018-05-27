import { Injectable } from "@angular/core";
import * as SendBird from "sendbird";
import { UserState, defaultUserState } from "../../reducers/user/user.reducer";
import { ChannelsState } from "../../reducers/channels/channels.reducer";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { setSnackMsg } from "../../actions/notifications/notifications.action";

@Injectable({
    providedIn: "root"
})
export class MainSendbird {
    private static instance: SendBird.SendBirdInstance = null;
    private _userState: UserState;
    private _channelsState: ChannelsState;
    private _sbChannels: Map<string, SendBird.OpenChannel> = new Map();

    constructor(private _state: Store<AppState>) {
        _state.select((state: AppState) => state)
            .subscribe((state: AppState) => {
                this._channelsState = state.channels;
                this._userState = state.user ? state.user : defaultUserState;
            });
    }

    set openChannels(channels: SendBird.OpenChannel[]) {
        channels.forEach((chan: SendBird.OpenChannel) => {
            this._sbChannels.set(chan.url, chan);
        });
    }

    enterChannel(channelUrl: string) {
        if (!this._sbChannels.has(channelUrl)) {
            return;
        }
        const channel: SendBird.OpenChannel = this._sbChannels.get(channelUrl);
        channel.enter((response: SendBird.OpenChannel, error: SendBird.SendBirdError) => {
            if (error) {
                this._state.dispatch(setSnackMsg(`Failed to enter channel ${channelUrl}`));
                console.warn("Failed to enter channel !", error);
                return;
            }
            console.log();
            this._state.dispatch(setSnackMsg(`entered channel ${channelUrl}`));
        });
    }


    async getSb() {
        if (MainSendbird.instance === null) {
            MainSendbird.instance = await new SendBird({ appId: "544368C6-DF3B-4534-A79D-054B15F64845" });
        }
        // console.log("MainSendbird.instance", MainSendbird.instance);
        return MainSendbird.instance;
    }
}
