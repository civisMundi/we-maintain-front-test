import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatChipsModule } from "@angular/material/chips";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatRadioModule } from "@angular/material/radio";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
    imports: [CommonModule],
    exports: [
        CommonModule,
        MatSidenavModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDividerModule,
        MatChipsModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
    ],
    declarations: []
})
export class SharedModule { }
