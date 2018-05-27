import { TestBed, inject } from "@angular/core/testing";

import { ChannelsService } from "./channels.service";
import { StoreModule, Store } from "@ngrx/store";
import { AppState, appReducer } from "../../reducers";

describe("ChannelsService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot(appReducer)],
            providers: [
                ChannelsService
            ]
        });
    });

    it("should be created", inject([ChannelsService], (service: ChannelsService) => {
        expect(service).toBeTruthy();
    }));
});
