import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import { appReducer, AppState } from "./index";
import { defaultUserState } from "./user/user.reducer";
import { defaultChannelsState } from "./channels/channels.reducer";
import { defaultNotificationsState } from "./notifications/notifications.reducer";
import { Action } from "../typings/Action";

export const defaultState: AppState = {
    user: defaultUserState,
    channels: defaultChannelsState,
    notifs: defaultNotificationsState,
};

describe("Main Reducer - index", () => {
    beforeEach(async(() => {
    }));

    it("should return default state", async(() => {
        const action: Action = {
            type: "whocares", payload: "yomoma"
        };
        expect(appReducer(undefined, action)).toEqual(defaultState);
    }));
});
