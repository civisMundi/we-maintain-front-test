import { Component, OnInit, Input } from "@angular/core";
import { Channel } from "../../../reducers/channels/channels.reducer";

@Component({
    selector: "app-channel-infos",
    templateUrl: "./channel-infos.component.html",
    styleUrls: ["./channel-infos.component.css"]
})
export class ChannelInfosComponent implements OnInit {
    @Input() channel: Channel;

    constructor() { }

    ngOnInit() {
    }
}
