import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";

@Component({
    selector: "app-page-home",
    templateUrl: "./page-home.component.html",
    styleUrls: ["./page-home.component.css"]
})
export class PageHomeComponent implements OnInit {
    public isLoading: boolean = null;

    constructor() {}

    ngOnInit() {
    }
}
