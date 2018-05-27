import { ActionReducer, combineReducers } from "@ngrx/store";
import { MessagesState, messagesReducer, defaultMessagesState } from "./messages/messages.reducer";
import { userReducer, UserState, defaultUserState } from "./user/user.reducer";

export interface AppState {
    messages: MessagesState;
    user: UserState;
}

export const Reducers: any = {
    messages: messagesReducer,
    user: userReducer,
};

export const defaultAppState: AppState = {
    messages: defaultMessagesState,
    user: defaultUserState,
};

const productionReducer: ActionReducer<AppState> = combineReducers(Reducers);

export function appReducer(state: any, action: any) {
    return productionReducer(state, action);
}
