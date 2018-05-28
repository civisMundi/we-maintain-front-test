import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

import { MessageComponent } from "./message.component";


@Component({ selector: "mat-icon", template: "" }) // tslint:disable-line
class MatIconComponent { }


describe("MessageComponent", () => {
    let component: MessageComponent;
    let fixture: ComponentFixture<MessageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MessageComponent,
                MatIconComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
