import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { MatListModule } from "@angular/material/list";

import { ChannelInfosComponent } from "./channel-infos.component";

@Component({ selector: "mat-spinner", template: "" }) // tslint:disable-line
class MatSpinnerComponent { }

@Component({ selector: "mat-icon", template: "" }) // tslint:disable-line
class MatIconComponent { }

describe("ChannelInfosComponent", () => {
    let component: ChannelInfosComponent;
    let fixture: ComponentFixture<ChannelInfosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChannelInfosComponent,
                MatSpinnerComponent,
                MatIconComponent,
            ],
            imports: [
                MatListModule,
            ]
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
