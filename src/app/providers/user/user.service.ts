import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { SendBirdError, User as SendBirdUser } from "sendbird";
import { MainSendbird } from "../sendbird/main.service";
import { AppState } from "../../reducers";
import { UserState, defaultUserState } from "../../reducers/user/user.reducer";
import { fetchingUser, failedFetchUser, successFetchUser, logoutUser } from "../../actions/user/user.action";
import { User } from "../../typings/User";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private static USER_STORE_KEY = "civispass_userId";
    private _userState: UserState;

    constructor(private sendbird: MainSendbird, private _state: Store<AppState>) {
        _state.select((state: AppState) => state)
            .subscribe((state: AppState) => {
                this._userState = state.user;
            });
    }

    storeUserId(id: string = this._userState.data.userId) {
        localStorage.setItem(UserService.USER_STORE_KEY, id);
    }

    removeUserId() {
        localStorage.removeItem(UserService.USER_STORE_KEY);
    }

    restoreLocalUser() {
        try {
            const userId: string = localStorage.getItem(UserService.USER_STORE_KEY);
            if (userId) {
                this.noAuthLogin(userId);
            }
        } catch (e) {}
    }

    async noAuthLogin(userId: string) {
        this._state.dispatch(fetchingUser());
        const sb = await this.sendbird.getSb();

        sb.connect(userId, async (user: SendBirdUser, error: SendBirdError) => {
            if (error) {
                this._state.dispatch(failedFetchUser());
                this.removeUserId();
            }
            this._state.dispatch(successFetchUser(user));
            this.storeUserId(user.userId);
            const fetchedInfos = await this.sendbird.fetchCurrentOpenChannelInfos();
            if (!fetchedInfos) {
                return;
            }
            this.sendbird.fetchCurrentOpenChannelMessages();
        });
    }

    async logoutUser() {
        this._state.dispatch(logoutUser());
        this.removeUserId();
        const sb = await this.sendbird.getSb();
        sb.disconnect();
    }
}
