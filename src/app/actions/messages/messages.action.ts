import { Action } from '../../typings/Action';
import { Message } from '../../typings/Message';
import * as messagesTypes from '../types/messages.type';

export const fetchingMessages = (): Action => {
    return {
        type: messagesTypes.FETCH_MESSAGES
    };
};

export const failedFetchingMessages = (): Action => {
    return {
        type: messagesTypes.FAIL_FETCH_MESSAGES
    };
};

export const successFetchingMessages = (messages: Message[]): Action => {
    return {
        type: messagesTypes.RECEIVED_MESSAGES,
        payload: { messages }
    };
};
