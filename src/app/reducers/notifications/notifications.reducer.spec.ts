import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import { notifsReducer } from "./notifications.reducer";
import * as messageTypes from "../../actions/types/notifications.type";
import { Action } from "../../typings/Action";

const defaultState = {
    snack: null,
};

describe("Reducer - Notifications", () => {
    beforeEach(async(() => {
    }));

    it("should return default state", async(() => {
        const action: Action = {
            type: "whocares", payload: "yomoma"
        };
        expect(notifsReducer(undefined, action)).toEqual(defaultState);
    }));

    it("should SET_SNACK_MSG", async(() => {
        const action: Action = {
            type: messageTypes.SET_SNACK_MSG,
            payload: { msg: "coucou" }
        };
        expect(notifsReducer(undefined, action)).toEqual({
            ...defaultState,
            snack: "coucou"
        });
    }));
});
