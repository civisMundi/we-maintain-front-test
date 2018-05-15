import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { Reducers } from './reducers/index';
import { AppRoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { PageHomeComponent } from './page/page-home/page-home.component';
import { LaunchService } from './service/launch/launch.service';
import { AppService } from './service/app.service';

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
        MatProgressSpinnerModule,
        MatDividerModule,
        MatIconModule,
        MatCardModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        AppService,
        LaunchService
    ],
    bootstrap: [AppComponent],
    exports: [PageHomeComponent]
})
export class AppModule { }
