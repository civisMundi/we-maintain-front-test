import { ActionReducer } from "@ngrx/store";
import * as messageTypes from "../../actions/types/messages.type";
import { Action } from "../../typings/Action";
import { Message } from "../../typings/Message";

export interface MessagesState {
    fetching: boolean;
    all: Message[];
}
export const defaultMessagesState: MessagesState = {
    fetching: false,
    all: []
};

export const messagesReducer: ActionReducer<Object> = (state: MessagesState = defaultMessagesState, action: Action) => {
    const { payload } = action;
    switch (action.type) {
        case messageTypes.FETCH_MESSAGES:
            return {
                ...state,
                fetching: true,
            };

        case messageTypes.RECEIVED_MESSAGES:
            return {
                ...state,
                fetching: false,
                all: state.all.concat(payload.messages),
            };

        case messageTypes.FAIL_FETCH_MESSAGES:
            return {
                ...state,
                fetching: false,
            };

        default:
            return state;
    }
};
