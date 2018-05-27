import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import * as channelsActions from "./channels.action";
import * as channelsTypes from "../../actions/types/channels.type";
import { Action } from "../../typings/Action";

describe("Action - Channels", () => {
    beforeEach(async(() => {
    }));

    it("should dispatch FETCHING_PUBLIC_CHANNEL_INFOS", async(() => {
        expect(channelsActions.fetchingPublicChannelInfos()).toEqual({
            type: channelsTypes.FETCHING_PUBLIC_CHANNEL_INFOS,
        });
    }));

    it("should dispatch SUCCESS_FETCH_PUBLIC_CHANNEL_INFOS", async(() => {
        expect(channelsActions.successFetchPublicChannelInfos(null)).toEqual({
            type: channelsTypes.SUCCESS_FETCH_PUBLIC_CHANNEL_INFOS,
            payload: { data: null },
        });
    }));

    it("should dispatch FAIL_FETCH_PUBLIC_CHANNEL_INFOS", async(() => {
        expect(channelsActions.failFetchPublicChannelInfos()).toEqual({
            type: channelsTypes.FAIL_FETCH_PUBLIC_CHANNEL_INFOS,
        });
    }));

    it("should dispatch FETCHING_PUBLIC_CHANNEL_MESSAGES", async(() => {
        expect(channelsActions.fetchingPublicChannelMsgs()).toEqual({
            type: channelsTypes.FETCHING_PUBLIC_CHANNEL_MESSAGES
        });
    }));

    it("should dispatch SUCCESS_FETCH_PUBLIC_CHANNEL_MESSAGES", async(() => {
        expect(channelsActions.successFetchPublicChannelMsgs([])).toEqual({
            type: channelsTypes.SUCCESS_FETCH_PUBLIC_CHANNEL_MESSAGES,
            payload: { data: [] }
        });
    }));

    it("should dispatch FAIL_FETCH_PUBLIC_CHANNEL_MESSAGES", async(() => {
        expect(channelsActions.failFetchPublicChannelMsgs()).toEqual({
            type: channelsTypes.FAIL_FETCH_PUBLIC_CHANNEL_MESSAGES,
        });
    }));
});
