import { ActionReducer, combineReducers } from "@ngrx/store";
import { userReducer, UserState, defaultUserState } from "./user/user.reducer";
import { ChannelsState, defaultChannelsState, channelsReducer } from "./channels/channels.reducer";
import { NotificationsState, notifsReducer, defaultNotificationsState } from "./notifications/notifications.reducer";

export interface AppState {
    user: UserState;
    channels: ChannelsState;
    notifs: NotificationsState;
}

export const Reducers: any = {
    user: userReducer,
    channels: channelsReducer,
    notifs: notifsReducer,
};

export const defaultAppState: AppState = {
    user: defaultUserState,
    channels: defaultChannelsState,
    notifs: defaultNotificationsState,
};

const productionReducer: ActionReducer<AppState> = combineReducers(Reducers);

export function appReducer(state: any, action: any) {
    return productionReducer(state, action);
}
