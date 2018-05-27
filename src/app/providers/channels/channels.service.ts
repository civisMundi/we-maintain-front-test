import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { MainSendbird } from "../sendbird/main.service";
import { AppState } from "../../reducers";
import { ChannelsState } from "../../reducers/channels/channels.reducer";
import * as channelsActions from "../../actions/channels/channels.action";
import { OpenChannel, SendBirdError } from "sendbird";
import { UserState, defaultUserState } from "../../reducers/user/user.reducer";
import { setSnackMsg } from "../../actions/notifications/notifications.action";

@Injectable({
    providedIn: "root"
})
export class ChannelsService {
    private _userState: UserState;
    private _channelsState: ChannelsState;

    constructor(private sendbird: MainSendbird, private _state: Store<AppState>) {
        _state.select((state: AppState) => state)
            .subscribe((state: AppState) => {
                this._channelsState = state.channels;
                this._userState = state.user ? state.user : defaultUserState;
            });
    }

    async fetchPublicChannelMetaData() {
        this._state.dispatch(channelsActions.fetchingPublicChannelInfos());
        const sb = await this.sendbird.getSb();
        sb.OpenChannel.createOpenChannelListQuery()
            .next((channels: OpenChannel[], error: SendBirdError) => {
                if (error || channels.length === 0) {
                    console.warn("ERROR ON OPEN CHANNELS LIST", error);
                    this._state.dispatch(setSnackMsg("Couldn't fetch open channels"));
                    this._state.dispatch(channelsActions.failFetchPublicChannelInfos());
                    return;
                }
                this.sendbird.openChannels = channels;
                this.sendbird.enterChannel(channels[0].url);
                this._state.dispatch(channelsActions.successFetchPublicChannelInfos(channels[0]));
            });
    }
}
