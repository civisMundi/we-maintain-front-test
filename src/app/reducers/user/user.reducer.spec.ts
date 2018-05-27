import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import { userReducer } from "./user.reducer";
import * as userTypes from "../../actions/types/user.type";
import { Action } from "../../typings/Action";
import { User } from "../../typings/User";

let defaultState = null;

let mockUser: User = null ;

describe("Reducer - User", () => {
    beforeEach(async(() => {
        defaultState = {
            fetching: false,
            isIdentified: false,
            data: null,
        };
        mockUser = {
            userId: "poulaymaning",
            nickname: "poulaymaning",
            profileUrl: "poulaymaning",
            metaData: {},
            connectionStatus: "poulaymaning",
            lastSeenAt: "poulaymaning",
            isActive: true,
            friendDiscoveryKey: null,
            friendName: null,
        };
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
            payload: { user: mockUser }
        };
        expect(userReducer(undefined, action)).toEqual({
            ...defaultState,
            fetching: false,
            data: mockUser,
            isIdentified: true,
        });
    }));

    it("should LOGOUT_USER", async(() => {
        const loginAction: Action = {
            type: userTypes.SUCCESS_CONNECTED_USER,
            payload: { user: mockUser }
        };
        const logoutAction: Action = {
            type: userTypes.LOGOUT_USER
        };
        const loggedInState = userReducer(undefined, loginAction);
        const logoutState = userReducer(loggedInState, logoutAction);
        expect(logoutState).toEqual(defaultState);
    }));

    it("should SUCCESS_CONNECTED_USER and set nickname to user's id", async(() => {
        mockUser.nickname = undefined;
        const action: Action = {
            type: userTypes.SUCCESS_CONNECTED_USER,
            payload: { user: mockUser }
        };
        expect(userReducer(undefined, action)).toEqual({
            ...defaultState,
            fetching: false,
            data: {
                ...mockUser,
                nickname: mockUser.userId,
             },
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
