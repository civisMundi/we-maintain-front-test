import { ActionReducer } from "@ngrx/store";
import * as channelsTypes from "../../actions/types/channels.type";
import { Action } from "../../typings/Action";
import { User } from "../../typings/User";
import { ChannelData } from "../../typings/ChannelInfo";
import { Message } from "../../typings/Message";


export interface Channel {
    infos: {
        data: ChannelData;
        isFetching: boolean;
    };
    messages: {
        data: Message[];
        isFetching: boolean;
    };
    entered: boolean;
}

export interface ChannelsState {
    current: Channel;
    urls: string[];
}
export const defaultChannelsState: ChannelsState = {
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
    },
    urls: [],
};

export const channelsReducer: ActionReducer<ChannelsState> = (state: ChannelsState = defaultChannelsState, action: Action) => {
    const { payload } = action;
    switch (action.type) {
        case channelsTypes.FETCHING_CURRENT_CHANNEL_INFOS:
            return {
                ...state,
                current: {
                    ...state.current,
                    infos: {
                        ...state.current.infos,
                        isFetching: true,
                    },
                    messages: state.current.messages,
                }
            };
        case channelsTypes.SUCCESS_FETCH_CURRENT_CHANNEL_INFOS:
            return {
                ...state,
                current: {
                    ...state.current,
                    infos: {
                        ...state.current.infos,
                        data: {
                            ...state.current.infos.data,
                            ...payload.data,
                        },
                        isFetching: false,
                    },
                    messages: state.current.messages,
                }
            };
        case channelsTypes.FAIL_FETCH_CURRENT_CHANNEL_INFOS:
            return {
                ...state,
                current: {
                    ...state.current,
                    infos: {
                        ...state.current.infos,
                        isFetching: false,
                    },
                }
            };
        case channelsTypes.FETCHING_CURRENT_CHANNEL_MESSAGES:
            return {
                ...state,
                current: {
                    ...state.current,
                    infos: state.current.infos,
                    messages: {
                        ...state.current.messages,
                        data: state.current.messages.data,
                        isFetching: true,
                    }
                }
            };
        case channelsTypes.SUCCESS_FETCH_CURRENT_CHANNEL_MESSAGES:
            return {
                ...state,
                current: {
                    ...state.current,
                    messages: {
                        ...state.current.messages,
                        data: state.current.messages.data.concat(payload.data),
                        isFetching: false,
                    }
                }
            };
        case channelsTypes.FAIL_FETCH_CURRENT_CHANNEL_MESSAGES:
            return {
                ...state,
                current: {
                    ...state.current,
                    messages: {
                        ...state.current.messages,
                        isFetching: false,
                    }
                }
            };
        case channelsTypes.SET_CHANNELS_URLS:
            return {
                ...state,
                urls: payload.data,
            };
        case channelsTypes.TOGGLE_ENTERED_CURRENT_CHANNEL:
            return {
                ...state,
                current: {
                    ...state.current,
                    entered: !state.current.entered
                }
            };
        default:
            return state;
    }
};
