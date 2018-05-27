import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import * as notifsActions from "./notifications.action";
import * as notifTypes from "../../actions/types/notifications.type";
import { Action } from "../../typings/Action";

describe("Action - Messages", () => {
    beforeEach(async(() => {
    }));

    it("should dispatch SET_SNACK_MSG", async(() => {
        expect(notifsActions.setSnackMsg(null)).toEqual({
            type: notifTypes.SET_SNACK_MSG,
            payload: { msg: null }
        });
    }));
});
