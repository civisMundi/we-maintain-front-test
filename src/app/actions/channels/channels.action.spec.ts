import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import * as channelsActions from "./channels.action";
import * as channelsTypes from "../../actions/types/channels.type";
import { Action } from "../../typings/Action";

describe("Action - Channels", () => {
    beforeEach(async(() => {
    }));

    it("should dispatch FETCHING_CURRENT_CHANNEL_INFOS", async(() => {
        expect(channelsActions.fetchingCurrentChannelInfos()).toEqual({
            type: channelsTypes.FETCHING_CURRENT_CHANNEL_INFOS,
        });
    }));

    it("should dispatch SUCCESS_FETCH_CURRENT_CHANNEL_INFOS", async(() => {
        expect(channelsActions.successFetchCurrentChannelInfos(null)).toEqual({
            type: channelsTypes.SUCCESS_FETCH_CURRENT_CHANNEL_INFOS,
            payload: { data: null },
        });
    }));

    it("should dispatch FAIL_FETCH_CURRENT_CHANNEL_INFOS", async(() => {
        expect(channelsActions.failFetchCurrentChannelInfos()).toEqual({
            type: channelsTypes.FAIL_FETCH_CURRENT_CHANNEL_INFOS,
        });
    }));

    it("should dispatch FETCHING_CURRENT_CHANNEL_MESSAGES", async(() => {
        expect(channelsActions.fetchingCurrentChannelMsgs()).toEqual({
            type: channelsTypes.FETCHING_CURRENT_CHANNEL_MESSAGES
        });
    }));

    it("should dispatch SUCCESS_FETCH_CURRENT_CHANNEL_MESSAGES", async(() => {
        expect(channelsActions.successFetchCurrentChannelMsgs([])).toEqual({
            type: channelsTypes.SUCCESS_FETCH_CURRENT_CHANNEL_MESSAGES,
            payload: { data: [] }
        });
    }));

    it("should dispatch FAIL_FETCH_CURRENT_CHANNEL_MESSAGES", async(() => {
        expect(channelsActions.failFetchCurrentChannelMsgs()).toEqual({
            type: channelsTypes.FAIL_FETCH_CURRENT_CHANNEL_MESSAGES,
        });
    }));

    it("should dispatch SET_CHANNELS_URLS", async(() => {
        expect(channelsActions.setChannelsUrlsList(["coucouURL"])).toEqual({
            type: channelsTypes.SET_CHANNELS_URLS,
            payload: { data: ["coucouURL"] }
        });
    }));

    it("should dispatch TOGGLE_ENTERED_CURRENT_CHANNEL", async(() => {
        expect(channelsActions.toggleEnteredChannel()).toEqual({
            type: channelsTypes.TOGGLE_ENTERED_CURRENT_CHANNEL,
        });
    }));
});
