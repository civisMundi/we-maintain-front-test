import { Action } from '../types/Action';
import * as launchTypes from './types/launch.type';
import { Launch } from '../types/Launch';
import { FAIL_FETCH_LAUNCH } from './types/launch.type';

export const fetchingLaunch = (): Action => {
    return {
        type: launchTypes.FETCH_LAUNCH
    };
};

export const failedFetchingLaunch = (): Action => {
    return {
        type: launchTypes.FAIL_FETCH_LAUNCH
    };
};

export const successFetchingLatestLaunch = (launch: Launch): Action => {
    return {
        type: launchTypes.SUCCESS_FETCH_LATEST_LAUNCH,
        payload: { launch }
    };
};
