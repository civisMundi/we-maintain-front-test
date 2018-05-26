import { Injectable } from "@angular/core";
import { SendBirdError, User as SendBirdUser } from "sendbird";
import { MainSendbird } from "../sendbird/main.service";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private api: MainSendbird) {}

    noAuthLogin(nickname: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.api.sb.connect(nickname, (user: SendBirdUser, error: SendBirdError) => {
                console.log("HEEEEY JUUUUDE - user", user);
                console.log("HEEEEY JUUUUDE - error", error);
                resolve(true);
            });
        });
    }
}
