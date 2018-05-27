import { ActionReducer } from "@ngrx/store";
import * as notificationsTypes from "../../actions/types/notifications.type";
import { Action } from "../../typings/Action";

export interface NotificationsState {
    snack: string;
}
export const defaultNotificationsState: NotificationsState = {
    snack: null
};

export const notifsReducer: ActionReducer<NotificationsState> = (state: NotificationsState = defaultNotificationsState, action: Action) => {
    const { payload } = action;
    switch (action.type) {
        case notificationsTypes.SET_SNACK_MSG:
            return {
                ...state,
                snack: payload.msg,
            };
        default:
            return state;
    }
};
