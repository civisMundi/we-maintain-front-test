import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

import { ChannelInfosComponent } from "./channel-infos.component";

@Component({ selector: "mat-spinner", template: "" }) // tslint:disable-line
class MatSpinnerComponent { }

describe("ChannelInfosComponent", () => {
    let component: ChannelInfosComponent;
    let fixture: ComponentFixture<ChannelInfosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChannelInfosComponent,
                MatSpinnerComponent,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelInfosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
