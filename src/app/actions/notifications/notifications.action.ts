import { Action } from "../../typings/Action";
import * as notifTypes from "../types/notifications.type";

export const setSnackMsg = (msg: string): Action => {
    return {
        type: notifTypes.SET_SNACK_MSG,
        payload: { msg }
    };
};
