import { ActionReducer, combineReducers } from "@ngrx/store";
import { MessagesState, messagesReducer, defaultMessagesState } from "./messages/messages.reducer";
import { userReducer, UserState, defaultUserState } from "./user/user.reducer";
import { ChannelsState, defaultChannelsState, channelsReducer } from "./channels/channels.reducer";

export interface AppState {
    messages: MessagesState;
    user: UserState;
    channels: ChannelsState;
}

export const Reducers: any = {
    messages: messagesReducer,
    user: userReducer,
    channels: channelsReducer,
};

export const defaultAppState: AppState = {
    messages: defaultMessagesState,
    user: defaultUserState,
    channels: defaultChannelsState,
};

const productionReducer: ActionReducer<AppState> = combineReducers(Reducers);

export function appReducer(state: any, action: any) {
    return productionReducer(state, action);
}
