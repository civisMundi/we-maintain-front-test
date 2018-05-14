import { Injectable, Inject } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers, HttpHeaderResponse as Response } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppService {
    private _access_token: String = '';
    private _apiEndPoint: String = 'https://api.spacexdata.com/v2';

    constructor(public http: Http) {
    }

    private _handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: better job of transforming error for user consumption
            console.error(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private _getOptions(options?: any) {
        return {
            ...httpOptions,
            headers: {
                'Authorization': `Bearer ${this._access_token}`
            },
            ...options
        };
    }

    get(route: string, options?: any): Observable<any> {
        options = this._getOptions(options);
        return this.http.get(this._apiEndPoint + route, options)
            .pipe(
                map(res => res),
                catchError(this._handleError<any>(`Yeah poulay man error`))
            );
    }

    put(route: string, body: any, options?: any): Observable<any> {
        options = this._getOptions(options);
        return this.http.put(this._apiEndPoint + route, body, options)
            .pipe(
                map(res => res),
                catchError(this._handleError<any>(`Yeah poulay man error`))
            );
    }

    post(route: string, body: any, options?: any): Observable<any> {
        options = this._getOptions(options);
        return this.http.post(this._apiEndPoint + route, body, options)
            .pipe(
                map(res => res),
                catchError(this._handleError<any>(`Yeah poulay man error`))
            );
    }

    delete(route: string, body: any, options?: any): Observable<any> {
        options = this._getOptions(options);
        return this.http.delete(this._apiEndPoint + route, options)
            .pipe(
                map(res => res),
                catchError(this._handleError<any>(`Yeah poulay man error`))
            );
    }

    patch(route: string, body: any, options?: any): Observable<any> {
        options = this._getOptions(options);
        return this.http.patch(this._apiEndPoint + route, body, options)
            .pipe(
                map(res => res),
                catchError(this._handleError<any>(`Yeah poulay man error`))
            );
    }
}
