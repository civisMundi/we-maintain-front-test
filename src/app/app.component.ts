import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";

import { LoginBoxComponent } from "./ui/component/login-box/login-box.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    constructor(public dialog: MatDialog) { }

    openDialog(): void {
        const dialogRef = this.dialog.open(LoginBoxComponent, {
            height: "100%",
            maxHeight: "250px",
            width: "100%",
            maxWidth: "300px",
        });
    }
}
