import { Component } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PageHomeComponent } from "./page-home.component";
import { appReducer } from "../../../reducers";
import { MatDialog } from "@angular/material";
import { ChannelsService } from "../../../providers/channels/channels.service";

const matDialog: Partial<MatDialog> = {
    open: jasmine.createSpy(),
};

const channelsService: Partial<ChannelsService> = {
    fetchPublicChannelMetaData: jasmine.createSpy(),
};


@Component({ selector: "mat-spinner", template: "" }) // tslint:disable-line
class MatSpinnerComponent { }

describe("PageHomeComponent", () => {
    let component: PageHomeComponent;
    let fixture: ComponentFixture<PageHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageHomeComponent, MatSpinnerComponent ],
            imports: [
                StoreModule.forRoot(appReducer),
            ],
            providers: [
                { provide: MatDialog, useValue: matDialog },
                { provide: ChannelsService, useValue: channelsService },
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
