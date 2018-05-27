import { ActionReducer } from "@ngrx/store";
import * as userTypes from "../../actions/types/user.type";
import { Action } from "../../typings/Action";
import { User } from "sendbird";

export interface UserState {
    fetching: boolean;
    isIdentified: boolean;
    data: User;
}
export const defaultUserState: UserState = {
    fetching: false,
    isIdentified: false,
    data: null,
};

export const userReducer: ActionReducer<Object> = (state: UserState = defaultUserState, action: Action) => {
    const { payload } = action;
    switch (action.type) {
        case userTypes.CONNECTING_USER:
            return {
                ...state,
                fetching: true,
            };
        case userTypes.SUCCESS_CONNECTED_USER:
            return {
                ...state,
                fetching: false,
                isIdentified: true,
                data: payload.user,
            };
        case userTypes.FAIL_CONNECTED_USER:
            return {
                ...state,
                fetching: false,
                isIdentified: false,
                data: null,
            };

        default:
            return state;
    }
};
