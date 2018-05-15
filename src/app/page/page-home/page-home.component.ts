import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { LaunchService } from '../../service/launch/launch.service';
import { Launch } from '../../types/Launch';
import { LaunchState } from '../../reducers/launch.reducer';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {
    public latestLaunch: Launch = null;
    public isLoading: boolean = null;

    constructor(private _launchService: LaunchService, iconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer) {
        this._launchService.state$.subscribe(this.launchStateListener);
        iconRegistry.addSvgIcon(
            'done_outline',
            _sanitizer.bypassSecurityTrustResourceUrl('assets/svg/outline-done.svg')
        );
        iconRegistry.addSvgIcon(
            'cancel_outline',
            _sanitizer.bypassSecurityTrustResourceUrl('assets/svg/outline-cancel.svg')
        );
    }

    get videoUrl() {
        const vidID = this.latestLaunch.links.video_link.split('=').reverse()[0];
        console.log("waaaaaay", vidID);
        return this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${vidID}`);
    }

    launchStateListener = (launchState: LaunchState) => {
        this.isLoading = launchState.fetching;
        this.latestLaunch = launchState.latest;
    }

    ngOnInit() {
        this._launchService.fetchLatestLaunch();
    }
}
