import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { SendBirdError, User as SendBirdUser } from "sendbird";
import { MainSendbird } from "../sendbird/main.service";
import { AppState } from "../../reducers";
import { UserState, defaultUserState } from "../../reducers/user/user.reducer";
import { fetchingUser, failedFetchUser, successFetchUser } from "../../actions/user/user.action";
import { User } from "../../typings/User";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private static USER_STORE_KEY = "civispass_userId";
    private _userState: UserState;

    constructor(private api: MainSendbird, private _state: Store<AppState>) {
        _state.select((state: AppState) => state)
            .subscribe((state: AppState) => {
                this._userState = state.user;
            });
    }

    storeUserId(id: string = this._userState.data.userId) {
        localStorage.setItem(UserService.USER_STORE_KEY, id);
    }

    restoreLocalUser() {
        try {
            const userId: string = localStorage.getItem(UserService.USER_STORE_KEY);
            if (userId) {
                this.noAuthLogin(userId);
            }
        } catch (e) {}
    }

    noAuthLogin(userId: string): Promise<boolean> {
        this._state.dispatch(fetchingUser());
        return new Promise((resolve) => {
            this.api.sb.connect(userId, (user: SendBirdUser, error: SendBirdError) => {
                if (error) {
                    this._state.dispatch(failedFetchUser());
                    return resolve(false);
                }
                this._state.dispatch(successFetchUser(user));
                this.storeUserId(user.userId);
                return resolve(true);
            });
        });
    }
}
