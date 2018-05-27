import { Action } from "../../typings/Action";
import { Message } from "../../typings/Message";
import * as userTypes from "../types/user.type";
import { User } from "../../typings/User";

export const fetchingUser = (): Action => {
    return {
        type: userTypes.CONNECTING_USER
    };
};

export const failedFetchUser = (): Action => {
    return {
        type: userTypes.FAIL_CONNECTED_USER
    };
};

export const logoutUser = (): Action => {
    return {
        type: userTypes.LOGOUT_USER
    };
};

export const successFetchUser = (user: User): Action => {
    return {
        type: userTypes.SUCCESS_CONNECTED_USER,
        payload: { user }
    };
};
