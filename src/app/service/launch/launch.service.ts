import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaderResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Launch } from '../../types/Launch';
import { AppService } from '../app.service';
import { AppState } from '../../reducers';
import * as launchActions from '../../actions/launch.action';
import { failedFetchingLaunch } from '../../actions/launch.action';
import { LaunchState } from '../../reducers/launch.reducer';

@Injectable({
    providedIn: 'root'
})
export class LaunchService {
    constructor(private _store: Store<AppState>, private _appService: AppService) { }

    get state$(): Observable<LaunchState> {
        return this._store
            .select(state => state.launch);
    }

    async fetchLatestLaunch() {
        this._store.dispatch(launchActions.fetchingLaunch());
        try {
            const res = await this._appService.get('/launches/latest').toPromise();
            if (res.flight_number) {
                return this._store.dispatch(launchActions.successFetchingLatestLaunch(res));
            }
            return this._store.dispatch(launchActions.failedFetchingLaunch());
        } catch (e) {
            return this._store.dispatch(launchActions.failedFetchingLaunch());
        }
    }
}
