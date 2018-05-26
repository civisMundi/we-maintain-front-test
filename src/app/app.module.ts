import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './modules/routing/routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { Reducers } from './reducers/index';
import { AppComponent } from './app.component';
import { PageHomeComponent } from './ui/page/page-home/page-home.component';

@NgModule({
    declarations: [
        AppComponent,
        PageHomeComponent
    ],
    imports: [
        StoreModule.forRoot(Reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: true, // Restrict extension to log-only mode
        }),
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        RoutingModule,
        SharedModule,
        HttpClientModule,
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
    exports: [PageHomeComponent]
})
export class AppModule { }
