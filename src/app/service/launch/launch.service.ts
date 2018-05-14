import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaderResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Launch } from '../../types/Launch';
import { AppService } from '../app.service';

@Injectable({
    providedIn: 'root'
})
export class LaunchService {
    private _launches: Launch[] = [
        // tslint:disable
        {
            flight_number: 38,
            launch_year: '2017',
            launch_date_unix: 1490912820,
            launch_date_utc: new Date('2017-03-30T22:27:00Z'),
            launch_date_local: new Date('2017-03-30T18:27:00-04:00'),
            rocket: {
                rocket_id: 'falcon9',
                rocket_name: 'Falcon 9',
                rocket_type: 'FT',
                first_stage: {
                    cores: [
                        {
                            core_serial: 'B1021',
                            flight: 2,
                            block: 2,
                            reused: true,
                            land_success: true,
                            landing_type: 'ASDS',
                            landing_vehicle: 'OCISLY'
                        }
                    ]
                },
                second_stage: {
                    payloads: [
                        {
                            payload_id: 'SES-10',
                            reused: false,
                            customers: [
                                'SES'
                            ],
                            payload_type: 'Satellite',
                            payload_mass_kg: 5300,
                            payload_mass_lbs: 11700,
                            orbit: 'GTO'
                        }
                    ]
                }
            },
            reuse: {
                core: true,
                side_core1: false,
                side_core2: false,
                fairings: false,
                capsule: false
            },
            telemetry: {
                flight_club: 'https://www.flightclub.io/results/?code=SS10'
            },
            launch_site: {
                site_id: 'ksc_lc_39a',
                site_name: 'KSC LC 39A',
                site_name_long: 'Kennedy Space Center Historic Launch Complex 39A'
            },
            launch_success: true,
            links: {
                mission_patch: 'https://images2.imgbox.com/4d/cd/pRO9j7ws_o.png',
                mission_patch_small: 'https://images2.imgbox.com/be/be/qSjjoOQa_o.png',
                reddit_campaign: 'https://www.reddit.com/r/spacex/comments/5sjrzj/ses10_launch_campaign_thread/',
                reddit_launch: 'https://www.reddit.com/r/spacex/comments/62aqi7/rspacex_ses10_official_launch_discussion_updates/',
                reddit_recovery: 'https://www.reddit.com/r/spacex/comments/634gmr/b1021ses10_recovery_thread/',
                reddit_media: 'https://www.reddit.com/r/spacex/comments/62aqad/rspacex_ses10_media_thread_videos_images_gifs/',
                presskit: 'http://www.spacex.com/sites/spacex/files/finalses10presskit.pdf',
                article_link: 'https://en.wikipedia.org/wiki/SES-10',
                video_link: 'https://www.youtube.com/watch?v=xsZSXav4wI8'
            },
            details: 'First payload to fly on a reused first stage, B1021, previously launched with CRS-8, which also landed a second time. In what is also a first, the payload fairing remained intact after a successful splashdown achieved with thrusters and a steerable parachute.'
        },
        {
            flight_number: 49,
            launch_year: '2017',
            launch_date_unix: 1507762380,
            launch_date_utc: new Date('2017-10-11T22:53:00Z'),
            launch_date_local: new Date('2017-10-11T18:53:00-04:00'),
            rocket: {
                rocket_id: 'falcon9',
                rocket_name: 'Falcon 9',
                rocket_type: 'FT',
                first_stage: {
                    cores: [
                        {
                            core_serial: 'B1031',
                            flight: 2,
                            block: 3,
                            reused: true,
                            land_success: true,
                            landing_type: 'ASDS',
                            landing_vehicle: 'OCISLY'
                        }
                    ]
                },
                second_stage: {
                    payloads: [
                        {
                            payload_id: 'SES-11 / Echostar 105',
                            reused: false,
                            customers: [
                                'SES',
                                'Echostar'
                            ],
                            payload_type: 'Satellite',
                            payload_mass_kg: 5200,
                            payload_mass_lbs: 11464,
                            orbit: 'GTO'
                        }
                    ]
                }
            },
            telemetry: {
                flight_club: 'https://www.flightclub.io/results/?code=SS11'
            },
            reuse: {
                core: true,
                side_core1: false,
                side_core2: false,
                fairings: false,
                capsule: false
            },
            launch_site: {
                site_id: 'ksc_lc_39a',
                site_name: 'KSC LC 39A',
                site_name_long: 'Kennedy Space Center Historic Launch Complex 39A'
            },
            launch_success: true,
            links: {
                mission_patch: 'https://images2.imgbox.com/13/e5/GbYfRyRQ_o.png',
                mission_patch_small: 'https://images2.imgbox.com/be/3a/9cdafTFk_o.png',
                reddit_campaign: 'https://www.reddit.com/r/spacex/comments/6yvn64/ses11echostar_105_launch_campaign_thread/',
                reddit_launch: 'https://www.reddit.com/r/spacex/comments/75bw7p/ses11echostar105_official_launch_discussions/',
                reddit_recovery: 'https://www.reddit.com/r/spacex/comments/76fqz1/b10312_recovery_thread/',
                reddit_media: 'https://www.reddit.com/r/spacex/comments/75pgu5/rspacex_ses11_media_thread_videos_images_gifs/',
                presskit: 'http://www.spacex.com/sites/spacex/files/echostar105ses11presskit.pdf', 
                article_link: 'https://spaceflightnow.com/2017/10/12/video-falcon-9-rocket-lifts-off-with-joint-satellite-for-ses-echostar/',
                video_link: 'https://www.youtube.com/watch?v=iv1zeGSvhIw'
            },
            details: 'Nineteenth comsat to GTO, also the fourth satellite launched for SES and second for Echostar. Third time a first stage booster will be reused.'
        }
        // tslint:enable
    ];

    constructor(private _appService: AppService) { }

    fetchLatestLaunch(): Observable<Launch> {
        return this._appService.get('/launches/latest').pipe(
            map((res: Launch) => res)
        );
    }
}
