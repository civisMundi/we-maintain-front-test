import { ActionReducer } from '@ngrx/store';
import { Action } from '../types/Action';
import { Launch } from '../types/Launch';
import * as launchTypes from '../actions/types/launch.type';

export interface LaunchState {
    fetching: boolean;
    latest: Launch;
}
export const defaultLaunchState: LaunchState = {
    fetching: false,
    latest: null
};

export const launchReducer: ActionReducer<Object> = (state: LaunchState = defaultLaunchState, action: Action) => {
    const { payload } = action;
    switch (action.type) {
        case launchTypes.FETCH_LAUNCH:
            return {
                ...state,
                fetching: true
            };

        case launchTypes.SUCCESS_FETCH_LATEST_LAUNCH:
            return {
                ...state,
                fetching: false,
                latest: payload.launch
            };

        case launchTypes.FAIL_FETCH_LAUNCH:
            return {
                ...state,
                fetching: false
            };

        default:
            return state;
    }
};
