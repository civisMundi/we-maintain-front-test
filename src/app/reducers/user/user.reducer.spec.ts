import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import { userReducer } from "./user.reducer";
import * as userTypes from "../../actions/types/user.type";
import { Action } from "../../typings/Action";

const defaultState = {
    fetching: false,
    isIdentified: false,
    data: null,
};

describe("Reducer - User", () => {
    beforeEach(async(() => {
    }));

    it("should return default state", async(() => {
        const action: Action = {
            type: "whocares", payload: "yomoma"
        };
        expect(userReducer(undefined, action)).toEqual(defaultState);
    }));

    it("should CONNECTING_USER", async(() => {
        const action: Action = {
            type: userTypes.CONNECTING_USER
        };
        expect(userReducer(undefined, action)).toEqual({
            ...defaultState,
            fetching: true
        });
    }));

    it("should SUCCESS_CONNECTED_USER", async(() => {
        const action: Action = {
            type: userTypes.SUCCESS_CONNECTED_USER,
            payload: { user: { nickname: "ah", userId: "ok" } }
        };
        expect(userReducer(undefined, action)).toEqual({
            ...defaultState,
            fetching: false,
            data: { nickname: "ah", userId: "ok" },
            isIdentified: true,
        });
    }));

    it("should SUCCESS_CONNECTED_USER and set nickname to user's id", async(() => {
        const action: Action = {
            type: userTypes.SUCCESS_CONNECTED_USER,
            payload: { user: { nickname: undefined, userId: "ok" } }
        };
        expect(userReducer(undefined, action)).toEqual({
            ...defaultState,
            fetching: false,
            data: { nickname: "ok", userId: "ok" },
            isIdentified: true,
        });
    }));

    it("should FAIL_CONNECTED_USER", async(() => {
        const action: Action = {
            type: userTypes.FAIL_CONNECTED_USER
        };
        expect(userReducer(undefined, action)).toEqual({
            ...defaultState,
            fetching: false,
            data: null,
            isIdentified: false,
        });
    }));
});
