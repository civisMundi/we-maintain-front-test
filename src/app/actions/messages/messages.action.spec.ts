import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import * as messagesActions from "./messages.action";
import * as messagesTypes from "../../actions/types/messages.type";
import { Action } from "../../typings/Action";

describe("Action - Messages", () => {
    beforeEach(async(() => {
    }));

    it("should dispatch FETCH_MESSAGES", async(() => {
        expect(messagesActions.fetchingMessages()).toEqual({
            type: messagesTypes.FETCH_MESSAGES
        });
    }));

    it("should dispatch FAIL_FETCH_MESSAGES", async(() => {
        expect(messagesActions.failedFetchingMessages()).toEqual({
            type: messagesTypes.FAIL_FETCH_MESSAGES
        });
    }));

    it("should dispatch successFetchingMessages", async(() => {
        expect(messagesActions.successFetchingMessages([{
            channelUrl: "poulay",
            channelType: "poulay",
            messageId: 123,
            message: "poulay",
            messageType: "poulay",
            data: "poulay",
            customType: "poulay",
            mentionedUsers: [],
            createdAt: 123456,
            updatedAt: null
        }])).toEqual({
            type: messagesTypes.RECEIVED_MESSAGES,
            payload: {messages: [{
                channelUrl: "poulay",
                channelType: "poulay",
                messageId: 123,
                message: "poulay",
                messageType: "poulay",
                data: "poulay",
                customType: "poulay",
                mentionedUsers: [],
                createdAt: 123456,
                updatedAt: null
            }]}
        });
    }));
});
