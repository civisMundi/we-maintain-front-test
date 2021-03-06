import { Injectable } from "@angular/core";
import * as SendBird from "sendbird";
import { UserState, defaultUserState } from "../../reducers/user/user.reducer";
import { Store } from "@ngrx/store";
import { ChannelsState } from "../../reducers/channels/channels.reducer";
import { AppState } from "../../reducers";
import { setSnackMsg } from "../../actions/notifications/notifications.action";
import * as channelsActions from "../../actions/channels/channels.action";

export const USERS_REFRESH_DELAY = 10000;
export const MAX_MESSAGES_PER_LOAD = 25;
export const MAX_CHANNELS_HANDLER = 10;

@Injectable({
    providedIn: "root"
})
export class MainSendbird {
    private static instance: SendBird.SendBirdInstance = null;
    private _userState: UserState;
    private _channelsState: ChannelsState;
    private _sbChannel: SendBird.OpenChannel;
    private _channelHandler: SendBird.ChannelHandler;
    private __channelHandlerIds: { id: string, used: boolean}[] = [];
    private _messagesQuery: SendBird.PreviousMessageListQuery;

    constructor(private _state: Store<AppState>) {
        _state.select((state: AppState) => state)
            .subscribe((state: AppState) => {
                this._channelsState = state.channels;
                this._userState = state.user ? state.user : defaultUserState;
            });
        for (let i = 0; i < MAX_CHANNELS_HANDLER; i++) {
            this.__channelHandlerIds[i] = {
                id: `CHANNEL-HANDLER-${i}-${Math.random()}`,
                used: false,
            };
        }
    }

    private async initChannelHandlers() {
        const sb = await this.getSb();
        this._channelHandler = new sb.ChannelHandler();
        // tslint:disable-next-line:max-line-length
        this._channelHandler.onMessageReceived = (pingedChannel: SendBird.BaseChannel, message: SendBird.BaseMessageInstance) => {
            if (pingedChannel.url === this._sbChannel.url) {
                this._state.dispatch(channelsActions.successFetchCurrentChannelMsgs([message]));
            }
        };
        this._channelHandler.onUserEntered = (pingedChannel, user) => {
            if (pingedChannel.url === this._sbChannel.url) {
                this._state.dispatch(channelsActions.addLoggedInUsersOnCurrentChannel([user]));
            }
        };
        this._channelHandler.onUserExited = (pingedChannel, user) => {
            if (pingedChannel.url === this._sbChannel.url) {
                this._state.dispatch(channelsActions.removeLoggedInUsersOnCurrentChannel([user.userId]));
            }
        };

        sb.addChannelHandler(await this.getHandlerID(), this._channelHandler);
        return;
    }

    async getSb() {
        if (MainSendbird.instance === null) {
            MainSendbird.instance = await new SendBird({ appId: "544368C6-DF3B-4534-A79D-054B15F64845" });
            this.initChannelHandlers();
        }
        // console.log("MainSendbird.instance", MainSendbird.instance);
        return MainSendbird.instance;
    }

    getHandlerID(): string {
        const obj = this.__channelHandlerIds.find(handler => !handler.used);
        if (!!obj) {
            return obj.id;
        } else {
            // @TODO handle no ids left scenario
        }

    }

    fetchAllOpenChannels(): Promise<boolean> {
        return new Promise(async (resolve) => {
            const sb = await this.getSb();
            sb.OpenChannel.createOpenChannelListQuery()
                .next((channels: SendBird.OpenChannel[], error: SendBird.SendBirdError) => {
                    if (error || channels.length === 0) {
                        console.warn("ERROR ON OPEN CHANNELS LIST", error);
                        this._state.dispatch(setSnackMsg("Couldn't fetch open channels"));
                        resolve(false);
                    }
                    this._state.dispatch(channelsActions.setChannelsUrlsList(channels.map(chan => chan.url)));
                    resolve(true);
                });
        });
    }

    enterCurrentChannel(): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this._sbChannel) {
                return;
            }
            this._sbChannel.enter((response: SendBird.OpenChannel, error: SendBird.SendBirdError) => {
                if (error) {
                    this._state.dispatch(setSnackMsg(`Failed to enter channel ${this._sbChannel.url}`));
                    console.warn("Failed to enter channel !", error);
                    resolve(false);
                    return;
                }
                this._state.dispatch(channelsActions.toggleEnteredChannel());
                this._state.dispatch(setSnackMsg(`entered channel ${this._sbChannel.url}`));
                resolve(true);
            });
        });
    }

    async sendMsgOnCurrentChannel(message: string): Promise<boolean> {
        if (!this._channelsState.current.entered && !await this.enterCurrentChannel()) {
            return;
        }
        const channelUrl = this._channelsState.current.infos.data.url;
        if (!this._sbChannel) {
            this._state.dispatch(setSnackMsg(`Failed to post on channel #1`));
            return;
        }
        this._state.dispatch(channelsActions.fetchingCurrentChannelMsgs());
        this._sbChannel.sendUserMessage(message, "", "", (msg: SendBird.UserMessage, error: SendBird.SendBirdError) => {
            if (error) {
                console.warn("sendUserMessage - error", error);
                this._state.dispatch(channelsActions.failFetchCurrentChannelMsgs());
                this._state.dispatch(setSnackMsg(`Failed to post on channel #2`));
                return;
            }
            this._state.dispatch(channelsActions.successFetchCurrentChannelMsgs([msg]));
        });
    }

    fetchCurrentOpenChannelInfos(): Promise<boolean> {
        return new Promise(async (resolve) => {
            const isCurrentChannelSet = this._channelsState.current.infos.data && this._channelsState.current.infos.data.url;
            if (!isCurrentChannelSet && this._channelsState.urls.length === 0) {
                await this.fetchAllOpenChannels();
            }
            if (this._channelsState.urls.length === 0) {
                console.warn("No default fallback channel");
                resolve(false);
                return;
            }
            const channelUrl = isCurrentChannelSet ? this._channelsState.current.infos.data.url : this._channelsState.urls[0];
            this._state.dispatch(channelsActions.fetchingCurrentChannelInfos());
            const sb = await this.getSb();
            sb.OpenChannel.getChannel(channelUrl, (channel: SendBird.OpenChannel, error: SendBird.SendBirdError) => {
                if (error) {
                    console.warn("Error on getChannel", error);
                    this._state.dispatch(setSnackMsg("Couldn't fetch open channels"));
                    this._state.dispatch(channelsActions.failFetchCurrentChannelInfos());
                    resolve(false);
                    return;
                }
                this._sbChannel = channel;
                this._state.dispatch(channelsActions.successFetchCurrentChannelInfos(channel));
                setInterval(this.fetchCurrentOpenChannelUsers.bind(this), USERS_REFRESH_DELAY);
                resolve(true);
            });
        });
    }

    fetchCurrentOpenChannelMessages(): Promise<boolean> {
        return new Promise((resolve) => {
            this._state.dispatch(channelsActions.fetchingCurrentChannelMsgs());
            this._messagesQuery = this._sbChannel.createPreviousMessageListQuery();
            this._messagesQuery.load(MAX_MESSAGES_PER_LOAD, true, (messageList, error) => {
                if (error) {
                    console.warn("fetchMessages - error", error);
                    this._state.dispatch(channelsActions.failFetchCurrentChannelMsgs());
                    this._state.dispatch(setSnackMsg(`Failed to retreive channel messages`));
                    resolve(false);
                    return;
                }
                this._state.dispatch(channelsActions.successFetchCurrentChannelMsgs(messageList.reverse()));
                resolve(true);
            });
        });
    }

    fetchCurrentOpenChannelUsers() {
        const participantListQuery = this._sbChannel.createParticipantListQuery();

        participantListQuery.next((actualUsers: SendBird.User[], error) => {
            if (error) {
                console.warn("fetchCurrentOpenChannelUsers Error:: ", error);
                return;
            }
            const oldUsers: string = this._channelsState.current.users.loggedIn
                .map(u => u.userId)
                .sort()
                .join("-M-YC-USTOMSEPARATOR");

            const newUsers: string = actualUsers
                .map(u => u.userId)
                .sort()
                .join("-M-YC-USTOMSEPARATOR");
            if (oldUsers === newUsers) {
                return;
            }
            if (this._channelsState.current.users.loggedIn.length > actualUsers.length) {
                const oldUserIdsArr: string[] = oldUsers.split("-M-YC-USTOMSEPARATOR");
                const newUserIdsArr: string[] = newUsers.split("-M-YC-USTOMSEPARATOR");
                for (let index = 0; index < oldUserIdsArr.length; index++) {
                    const oldUserId = oldUserIdsArr[index];
                    if (!!!newUserIdsArr.find((newUserId) => newUserId === oldUserId)) {
                        this._state.dispatch(channelsActions.removeLoggedInUsersOnCurrentChannel([oldUserId]));
                        break;
                    }
                }
            } else {
                this._state.dispatch(channelsActions.addLoggedInUsersOnCurrentChannel(actualUsers));
            }
        });
    }

    exitCurrentChannel() {
        if (!this._channelsState.current.entered) {
            return;
        }
        this._sbChannel.exit((channel: SendBird.OpenChannel, error) => {
            if (error) {
                console.warn(`user could not exit channel  ${channel.url}`, error);
            }
        });
    }

    fetchMoreOpenChannelMessages() {
        if (!this._channelsState.current.messages.allMessagesFetched
            &&  this._messagesQuery
            && !this._channelsState.current.messages.isFetching) {
            this._state.dispatch(channelsActions.fetchingCurrentChannelMsgs());
            this._messagesQuery.load(MAX_MESSAGES_PER_LOAD, true, (messageList, error) => {
                if (error) {
                    console.warn("fetch older messages - error", error);
                    this._state.dispatch(channelsActions.failFetchCurrentChannelMsgs());
                    this._state.dispatch(setSnackMsg(`Failed to retreive older channel messages`));
                    return;
                }
                if (messageList.length < MAX_MESSAGES_PER_LOAD) {
                    this._state.dispatch(channelsActions.toggleFetchedAllCurrentChannelMessages());
                }
                this._state.dispatch(channelsActions.successFetchCurrentChannelOlderMsgs(messageList.reverse()));
            });
        }
    }
}
