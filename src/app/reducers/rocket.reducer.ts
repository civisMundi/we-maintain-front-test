import { ActionReducer } from '@ngrx/store';
import { Action } from '../types/Action';
import { Rocket } from '../types/Rocket';
import * as rocketTypes from '../actions/types/rocket.type';

export interface RocketState {
    fetching: boolean;
    falcon1: Rocket;
}
export const defaultRocketState: RocketState = {
    fetching: false,
    falcon1: null
};

export const rocketReducer: ActionReducer<Object> = (state: RocketState = defaultRocketState, action: Action) => {
    const { payload } = action;
    switch (action.type) {
        case rocketTypes.FETCH_ROCKET_API:
            return {
                ...state,
                fetching: true
            };

        case rocketTypes.SUCCESS_FETCH_FALCON1:
            return {
                ...state,
                fetching: false,
                falcon1: payload.rocket
            };

        case rocketTypes.FAIL_FETCH_ROCKET_API:
            return {
                ...state,
                fetching: false
            };

        default:
            return state;
    }
};
