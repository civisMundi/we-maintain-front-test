import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import { messagesReducer } from "./messages.reducer";
import * as messageTypes from "../../actions/types/messages.type";
import { Action } from "../../typings/Action";

const defaultState = {
    fetching: false,
    all: []
};

describe("Reducer - Messages", () => {
    beforeEach(async(() => {
    }));

    it("should return default state", async(() => {
        const action: Action = {
            type: "whocares", payload: "yomoma"
        };
        expect(messagesReducer(undefined, action)).toEqual(defaultState);
    }));

    it("should FETCH_MESSAGES", async(() => {
        const action: Action = {
            type: messageTypes.FETCH_MESSAGES
        };
        expect(messagesReducer(undefined, action)).toEqual({
            ...defaultState,
            fetching: true
        });
    }));

    it("should RECEIVED_MESSAGES", async(() => {
        const action: Action = {
            type: messageTypes.RECEIVED_MESSAGES,
            payload: { messages: [{
                id: "coucou",
                user: null,
                isoDate: "ahok",
                content: "ahok",
            }] }
        };
        expect(messagesReducer(undefined, action)).toEqual({
            ...defaultState,
            all: [{
                id: "coucou",
                user: null,
                isoDate: "ahok",
                content: "ahok",
            }]
        });
    }));

    it("should FAIL_FETCH_MESSAGES", async(() => {
        const action: Action = {
            type: messageTypes.FAIL_FETCH_MESSAGES
        };
        expect(messagesReducer(undefined, action)).toEqual({
            ...defaultState,
            fetching: false
        });
    }));
});
