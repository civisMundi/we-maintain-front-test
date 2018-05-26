import { Injectable } from "@angular/core";
import * as SendBird from "sendbird";

@Injectable({
    providedIn: "root"
})
export class MainSendbird {
    private static instance: SendBird.SendBirdInstance = null;

    public get sb() {
        if (MainSendbird.instance === null) {
            MainSendbird.instance = new SendBird({ appId: "544368C6-DF3B-4534-A79D-054B15F64845" });
        }
        console.log("MainSendbird.instance", MainSendbird.instance);
        return MainSendbird.instance;
    }
}
