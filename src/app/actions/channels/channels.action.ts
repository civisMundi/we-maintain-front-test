import { Action } from "../../typings/Action";
import { Message } from "../../typings/Message";
import * as channelsTypes from "../types/channels.type";
import { User } from "../../typings/User";
import { ChannelData } from "../../typings/ChannelInfo";

export const fetchingCurrentChannelMsgs = (): Action => {
    return {
        type: channelsTypes.FETCHING_CURRENT_CHANNEL_MESSAGES
    };
};

export const successFetchCurrentChannelMsgs = (data: Message[]): Action => {
    return {
        type: channelsTypes.SUCCESS_FETCH_CURRENT_CHANNEL_MESSAGES,
        payload: { data }
    };
};

export const successFetchCurrentChannelOlderMsgs = (data: Message[]): Action => {
    return {
        type: channelsTypes.SUCCESS_FETCH_CURRENT_OLDER_CHANNEL_MESSAGES,
        payload: { data }
    };
};

export const failFetchCurrentChannelMsgs = (): Action => {
    return {
        type: channelsTypes.FAIL_FETCH_CURRENT_CHANNEL_MESSAGES
    };
};

export const fetchingCurrentChannelInfos = (): Action => {
    return {
        type: channelsTypes.FETCHING_CURRENT_CHANNEL_INFOS
    };
};

export const successFetchCurrentChannelInfos = (data: ChannelData): Action => {
    return {
        type: channelsTypes.SUCCESS_FETCH_CURRENT_CHANNEL_INFOS,
        payload: { data }
    };
};

export const failFetchCurrentChannelInfos = (): Action => {
    return {
        type: channelsTypes.FAIL_FETCH_CURRENT_CHANNEL_INFOS
    };
};

export const setChannelsUrlsList = (data: string[]): Action => {
    return {
        type: channelsTypes.SET_CHANNELS_URLS,
        payload: { data },
    };
};

export const toggleEnteredChannel = (): Action => {
    return {
        type: channelsTypes.TOGGLE_ENTERED_CURRENT_CHANNEL
    };
};

export const addLoggedInUsersOnCurrentChannel = (users: User[]): Action => {
    return {
        type: channelsTypes.ADD_CURRENT_CHANNEL_LOGGEDIN_USERS,
        payload: { data: users },
    };
};

export const removeLoggedInUsersOnCurrentChannel = (userIds: string[]): Action => {
    return {
        type: channelsTypes.REMOVE_CURRENT_CHANNEL_LOGGEDIN_USERS,
        payload: { data: userIds },
    };
};

export const toggleFetchedAllCurrentChannelMessages = (): Action => {
    return {
        type: channelsTypes.TOGGLE_ALL_CURRENT_CHANNEL_MSGS_FETCHED,
    };
};
