import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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
        BrowserModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatCardModule,
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
