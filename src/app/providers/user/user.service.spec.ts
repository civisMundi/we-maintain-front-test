import { TestBed, inject } from "@angular/core/testing";

import { UserService } from "./user.service";
import { StoreModule, Store } from "@ngrx/store";
import { AppState, appReducer } from "../../reducers";

describe("UserService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot(appReducer)],
            providers: [
                UserService
            ]
        });
    });

    it("should be created", inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
