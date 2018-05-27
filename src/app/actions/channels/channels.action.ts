import { Action } from "../../typings/Action";
import { Message } from "../../typings/Message";
import * as channelsTypes from "../types/channels.type";
import { User } from "../../typings/User";
import { Channel } from "../../typings/Channel";

export const fetchingPublicChannelMsgs = (): Action => {
    return {
        type: channelsTypes.FETCHING_PUBLIC_CHANNEL_MESSAGES
    };
};

export const successFetchPublicChannelMsgs = (data: Message[]): Action => {
    return {
        type: channelsTypes.SUCCESS_FETCH_PUBLIC_CHANNEL_MESSAGES,
        payload: { data }
    };
};

export const failFetchPublicChannelMsgs = (): Action => {
    return {
        type: channelsTypes.FAIL_FETCH_PUBLIC_CHANNEL_MESSAGES
    };
};

export const fetchingPublicChannelInfos = (): Action => {
    return {
        type: channelsTypes.FETCHING_PUBLIC_CHANNEL_INFOS
    };
};

export const successFetchPublicChannelInfos = (data: Channel): Action => {
    return {
        type: channelsTypes.SUCCESS_FETCH_PUBLIC_CHANNEL_INFOS,
        payload: { data }
    };
};

export const failFetchPublicChannelInfos = (): Action => {
    return {
        type: channelsTypes.FAIL_FETCH_PUBLIC_CHANNEL_INFOS
    };
};
