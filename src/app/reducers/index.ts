import { MessagesState, messagesReducer, defaultMessagesState } from "./messages/messages.reducer";
import { ActionReducer, combineReducers } from "@ngrx/store";

export interface AppState {
    launch: MessagesState;
}

export const Reducers: any = {
    messages: messagesReducer,
};

export const defaultAppState: any = {
    messages: defaultMessagesState,
};

const productionReducer: ActionReducer<AppState> = combineReducers(Reducers);

export function appReducer(state: any, action: any) {
    return productionReducer(state, action);
}
