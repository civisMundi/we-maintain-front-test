import { Component, OnInit, Input } from "@angular/core";
import { Message } from "../../../typings/Message";

@Component({
    selector: "app-message-component",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
    @Input() message: Message;
    private defaultUserNickname = "Unknown User";
    constructor() { }

    getUserNickname(): string {
        const sender = this.message._sender;
        if (!sender) {
            return this.defaultUserNickname;
        }
        if (sender && sender.nickname.length > 0) {
            return sender.nickname;
        } else if (sender && sender.userId) {
            return sender.userId;
        }
        return this.defaultUserNickname;
    }

    isTooOld(): boolean {
        return Date.now() - this.message.createdAt > 1000 * 60 * 60 * 24;
    }


    ngOnInit() {
    }

}
