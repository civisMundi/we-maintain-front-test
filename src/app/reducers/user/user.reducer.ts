import { ActionReducer } from "@ngrx/store";
import * as userTypes from "../../actions/types/user.type";
import { Action } from "../../typings/Action";
import { User } from "../../typings/User";

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

export const userReducer: ActionReducer<UserState> = (state: UserState = defaultUserState, action: Action) => {
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
                data: {
                    ...payload.user,
                    nickname: payload.user.nickname || payload.user.userId
                },
            };
        case userTypes.FAIL_CONNECTED_USER:
            return {
                ...state,
                fetching: false,
                isIdentified: false,
                data: null,
            };
        case userTypes.LOGOUT_USER:
            return defaultUserState;
        default:
            return state;
    }
};
