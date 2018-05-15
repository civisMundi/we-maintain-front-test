import { LaunchState, launchReducer, defaultLaunchState } from './launch.reducer';
import { RocketState, rocketReducer, defaultRocketState } from './rocket.reducer';
import { ActionReducer, combineReducers } from '@ngrx/store';

export interface AppState {
    launch: LaunchState;
    rocket: RocketState;
}

export const Reducers: any = {
    launch: launchReducer,
    rocket: rocketReducer
};

export const defaultAppState: any = {
    launch: defaultLaunchState,
    rocket: defaultRocketState
};

const productionReducer: ActionReducer<AppState> = combineReducers(Reducers);

export function appReducer(state: any, action: any) {
    return productionReducer(state, action);
}
