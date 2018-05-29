import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

import { appReducer } from "../../../reducers";
import { ChannelMessagesComponent } from "./channel-messages.component";
import { Message } from "../../../typings/Message";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({ selector: "mat-spinner", template: "" }) // tslint:disable-line
class MatSpinnerComponent { }

@Component({ selector: "mat-icon", template: "" }) // tslint:disable-line
class MatIconComponent { }

@Component({ selector: "app-message-component", template: "" }) // tslint:disable-line
class MessageComponent {
    @Input() message: Message;
}

describe("ChannelMessagesComponent", () => {
    let component: ChannelMessagesComponent;
    let fixture: ComponentFixture<ChannelMessagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChannelMessagesComponent,
                MatSpinnerComponent,
                MatIconComponent,
                MessageComponent,
            ],
            imports: [
                StoreModule.forRoot(appReducer),
                MatInputModule,
                ReactiveFormsModule,
                FormsModule,
                BrowserAnimationsModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelMessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
