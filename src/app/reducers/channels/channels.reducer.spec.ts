import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import { channelsReducer, ChannelsState } from "./channels.reducer";
import * as channelsTypes from "../../actions/types/channels.type";
import { Action } from "../../typings/Action";

export const defaultState: ChannelsState = {
    current: {
        infos: {
            data: null,
            isFetching: false,
        },
        messages: {
            data: [],
            isFetching: false,
        },
        entered: false,
        users: {
            loggedIn: [],
        },
    },
    urls: [],
};

describe("Reducer - Channels", () => {
    beforeEach(async(() => {
    }));

    it("should return default state", async(() => {
        const action: Action = {
            type: "whocares", payload: "yomoma"
        };
        expect(channelsReducer(undefined, action)).toEqual(defaultState);
    }));

    it("should FETCHING_CURRENT_CHANNEL_INFOS", async(() => {
        const action: Action = {
            type: channelsTypes.FETCHING_CURRENT_CHANNEL_INFOS
        };
        expect(channelsReducer(undefined, action)).toEqual({
            ...defaultState,
            current: {
                ...defaultState.current,
                infos: {
                    ...defaultState.current.infos,
                    isFetching: true,
                }
            }
        });
    }));

    it("should SUCCESS_FETCH_CURRENT_CHANNEL_INFOS", async(() => {
        const action: Action = {
            type: channelsTypes.SUCCESS_FETCH_CURRENT_CHANNEL_INFOS,
            payload: { data: {
                url: "coucou",
                name: "coucou",
                coverUrl: "coucou",
                data: "coucou",
                customType: "coucou",
                isFrozen: true,
                isEphemeral: true,
                createdAt: "coucou",
            }}
        };
        expect(channelsReducer(undefined, action)).toEqual({
            ...defaultState,
            current: {
                ...defaultState.current,
                infos: {
                    ...defaultState.current.infos,
                    isFetching: false,
                    data: {
                        url: "coucou",
                        name: "coucou",
                        coverUrl: "coucou",
                        data: "coucou",
                        customType: "coucou",
                        isFrozen: true,
                        isEphemeral: true,
                        createdAt: "coucou",
                    }
                }
            }
        });
    }));

    it("should FAIL_FETCH_CURRENT_CHANNEL_INFOS", async(() => {
        const action: Action = {
            type: channelsTypes.FAIL_FETCH_CURRENT_CHANNEL_INFOS
        };
        expect(channelsReducer(undefined, action)).toEqual({
            ...defaultState,
            current: {
                ...defaultState.current,
                infos: {
                    ...defaultState.current.infos,
                    isFetching: false,
                }
            }
        });
    }));

    it("should FETCHING_CURRENT_CHANNEL_MESSAGES", async(() => {
        const action: Action = {
            type: channelsTypes.FETCHING_CURRENT_CHANNEL_MESSAGES
        };
        expect(channelsReducer(undefined, action)).toEqual({
            ...defaultState,
            current: {
                ...defaultState.current,
                infos: defaultState.current.infos,
                messages: {
                    ...defaultState.current.messages,
                    data: defaultState.current.messages.data,
                    isFetching: true,
                }
            }
        });
    }));

    it("should SUCCESS_FETCH_CURRENT_CHANNEL_MESSAGES", async(() => {
        const action: Action = {
            type: channelsTypes.SUCCESS_FETCH_CURRENT_CHANNEL_MESSAGES,
            payload: {data: [{
                channelUrl: "coucou",
                channelType: "coucou",
                messageId: 123,
                message: "coucou",
                messageType: "coucou",
                data: "coucou",
                customType: "coucou",
                mentionedUsers: [],
                createdAt: 123,
                updatedAt: 123,
                _sender: null
            }]},
        };
        expect(channelsReducer(undefined, action)).toEqual({
            ...defaultState,
            current: {
                ...defaultState.current,
                messages: {
                    ...defaultState.current.messages,
                    data: [{
                        channelUrl: "coucou",
                        channelType: "coucou",
                        messageId: 123,
                        message: "coucou",
                        messageType: "coucou",
                        data: "coucou",
                        customType: "coucou",
                        mentionedUsers: [],
                        createdAt: 123,
                        updatedAt: 123,
                        _sender: null
                    }],
                    isFetching: false,
                }
            }
        });
    }));

    it("should FAIL_FETCH_CURRENT_CHANNEL_MESSAGES", async(() => {
        const action: Action = {
            type: channelsTypes.FAIL_FETCH_CURRENT_CHANNEL_MESSAGES,
        };
        expect(channelsReducer(undefined, action)).toEqual({
            ...defaultState,
            current: {
                ...defaultState.current,
                messages: {
                    ...defaultState.current.messages,
                    isFetching: false,
                }
            }
        });
    }));

    it("should SET_CHANNELS_URLS", async(() => {
        const action: Action = {
            type: channelsTypes.SET_CHANNELS_URLS,
            payload: { data: ["coucou", "channel", "ids"] },
        };
        expect(channelsReducer(undefined, action)).toEqual({
            ...defaultState,
            urls: ["coucou", "channel", "ids"],
        });
    }));

    it("should TOGGLE_ENTERED_CURRENT_CHANNEL", async(() => {
        const action: Action = {
            type: channelsTypes.TOGGLE_ENTERED_CURRENT_CHANNEL,
            payload: { data: ["coucou", "channel", "ids"] },
        };
        expect(channelsReducer(undefined, action)).toEqual({
            ...defaultState,
            current: {
                ...defaultState.current,
                entered: !defaultState.current.entered
            }
        });
    }));

    it("should ADD_CURRENT_CHANNEL_LOGGEDIN_USERS", async(() => {
        const action: Action = {
            type: channelsTypes.ADD_CURRENT_CHANNEL_LOGGEDIN_USERS,
            payload: {
                data: [{
                    userId: "coucou",
                    nickname: "coucou",
                    profileUrl: "coucou",
                    metaData: {},
                    connectionStatus: "coucou",
                    lastSeenAt: "coucou",
                    isActive: true,
                    friendDiscoveryKey: "",
                    friendName: "",
            }]},
        };
        expect(channelsReducer(undefined, action)).toEqual({
            ...defaultState,
            current: {
                ...defaultState.current,
                users: {
                    loggedIn: [{
                        userId: "coucou",
                        nickname: "coucou",
                        profileUrl: "coucou",
                        metaData: {},
                        connectionStatus: "coucou",
                        lastSeenAt: "coucou",
                        isActive: true,
                        friendDiscoveryKey: "",
                        friendName: "",
                    }],
                },
            },
        });
    }));

    it("should REMOVE_CURRENT_CHANNEL_LOGGEDIN_USERS", async(() => {
        const modifiedState: ChannelsState = {
            ...defaultState,
            current: {
                ...defaultState.current,
                users: {
                    loggedIn: [{
                        userId: "coucou",
                        nickname: "coucou",
                        profileUrl: "coucou",
                        metaData: {},
                        connectionStatus: "coucou",
                        lastSeenAt: "coucou",
                        isActive: true,
                        friendDiscoveryKey: "",
                        friendName: "",
                    }],
                },
            },
        };
        const action: Action = {
            type: channelsTypes.REMOVE_CURRENT_CHANNEL_LOGGEDIN_USERS,
            payload: { data: ["coucou"] },
        };
        expect(channelsReducer(modifiedState, action)).toEqual({
            ...defaultState,
            current: {
                ...defaultState.current,
                users: {
                    loggedIn: [],
                },
            },
        });
    }));
});
