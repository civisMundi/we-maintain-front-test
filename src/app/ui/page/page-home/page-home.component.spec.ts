import { Component, Input } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PageHomeComponent } from "./page-home.component";
import { appReducer } from "../../../reducers";
import { MatDialog } from "@angular/material";
import { Channel } from "../../../reducers/channels/channels.reducer";

const matDialog: Partial<MatDialog> = {
    open: jasmine.createSpy(),
};

@Component({ selector: "mat-spinner", template: "" }) // tslint:disable-line
class MatSpinnerComponent { }

@Component({ selector: "mat-icon", template: "" }) // tslint:disable-line
class MatIconComponent { }

@Component({ selector: "app-channel-infos", template: "" }) // tslint:disable-line
class ChannelInfosComponent {
    @Input() channel: Channel;
}
@Component({ selector: "app-channel-messages", template: "" }) // tslint:disable-line
class ChannelMessagesComponent {
    @Input() channel: Channel;
}

describe("PageHomeComponent", () => {
    let component: PageHomeComponent;
    let fixture: ComponentFixture<PageHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PageHomeComponent,
                ChannelInfosComponent,
                ChannelMessagesComponent,
            ],
            imports: [
                StoreModule.forRoot(appReducer),
            ],
            providers: [
                { provide: MatDialog, useValue: matDialog },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
