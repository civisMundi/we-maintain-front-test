import { Component, OnInit } from '@angular/core';
import { LaunchService } from '../../service/launch/launch.service';
import { Launch } from '../../types/Launch';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

    constructor(private _launchService: LaunchService) { }

    ngOnInit() {
        this._launchService.fetchLatestLaunch().subscribe((res: Launch) => {
            console.log('ouais bien ?', res);
        });
    }

}
