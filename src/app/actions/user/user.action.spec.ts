import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import * as userActions from "./user.action";
import * as userTypes from "../../actions/types/user.type";
import { Action } from "../../typings/Action";
import { commonCallback, User } from "sendbird";

describe("Action - Messages", () => {
    beforeEach(async(() => {
    }));

    it("should dispatch CONNECTING_USER", async(() => {
        expect(userActions.fetchingUser()).toEqual({
            type: userTypes.CONNECTING_USER
        });
    }));

    it("should dispatch LOGOUT_USER", async(() => {
        expect(userActions.logoutUser()).toEqual({
            type: userTypes.LOGOUT_USER
        });
    }));

    it("should dispatch SUCCESS_CONNECTED_USER", async(() => {
        expect(userActions.successFetchUser(null)).toEqual({
            type: userTypes.SUCCESS_CONNECTED_USER,
            payload: {
                user: null
            }
        });
    }));

    it("should dispatch FAIL_CONNECTED_USER", async(() => {
        expect(userActions.failedFetchUser()).toEqual({
            type: userTypes.FAIL_CONNECTED_USER
        });
    }));
});
