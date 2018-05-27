import { ActionReducer } from "@ngrx/store";
import * as channelsTypes from "../../actions/types/channels.type";
import { Action } from "../../typings/Action";
import { User } from "../../typings/User";
import { Channel } from "../../typings/Channel";
import { Message } from "../../typings/Message";

export interface ChannelsState {
    public: {
        infos: {
            data: Channel;
            isFetching: boolean;
        };
        messages: {
            data: Message[];
            isFetching: boolean;
        }
    };
}
export const defaultChannelsState: ChannelsState = {
    public: {
        infos: {
            data: null,
            isFetching: false,
        },
        messages: {
            data: [],
            isFetching: false,
        },
    },
};

export const channelsReducer: ActionReducer<ChannelsState> = (state: ChannelsState = defaultChannelsState, action: Action) => {
    const { payload } = action;
    switch (action.type) {
        case channelsTypes.FETCHING_PUBLIC_CHANNEL_INFOS:
            return {
                ...state,
                public: {
                    infos: {
                        ...state.public.infos,
                        isFetching: true,
                    },
                    messages: state.public.messages,
                }
            };
        case channelsTypes.SUCCESS_FETCH_PUBLIC_CHANNEL_INFOS:
            return {
                ...state,
                public: {
                    infos: {
                        ...state.public.infos,
                        data: {
                            ...state.public.infos.data,
                            ...payload.data,
                        },
                        isFetching: false,
                    },
                    messages: state.public.messages,
                }
            };
        case channelsTypes.FAIL_FETCH_PUBLIC_CHANNEL_INFOS:
            return {
                ...state,
                public: {
                    ...state.public,
                    infos: {
                        ...state.public.infos,
                        isFetching: false,
                    },
                }
            };
        case channelsTypes.FETCHING_PUBLIC_CHANNEL_MESSAGES:
            return {
                ...state,
                public: {
                    infos: state.public.infos,
                    messages: {
                        data: state.public.messages.data,
                        isFetching: true,
                    }
                }
            };
        case channelsTypes.SUCCESS_FETCH_PUBLIC_CHANNEL_MESSAGES:
            return {
                ...state,
                public: {
                   ...state.public,
                    messages: {
                        data: state.public.messages.data.concat(payload.data),
                        isFetching: false,
                    }
                }
            };
        case channelsTypes.FAIL_FETCH_PUBLIC_CHANNEL_MESSAGES:
            return {
                ...state,
                public: {
                   ...state.public,
                    messages: {
                        ...state.public.messages,
                        isFetching: false,
                    }
                }
            };
        default:
            return state;
    }
};
