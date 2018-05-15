import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaderResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Launch } from '../../types/Launch';
import { AppService } from '../app.service';

@Injectable({
    providedIn: 'root'
})
export class LaunchService {
    constructor(private _appService: AppService) { }

    fetchLatestLaunch(): Observable<Launch> {
        return this._appService.get('/launches/latest').pipe(
            map((res: Launch) => res)
        );
    }
}
