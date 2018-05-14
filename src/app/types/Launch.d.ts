export type Launch ={
    flight_number: Number,
    launch_year: String,
    launch_date_unix: Number,
    launch_date_utc: Date,
    launch_date_local: Date,
    rocket: {
        rocket_id: String,
        rocket_name: String,
        rocket_type: String,
        first_stage: {
            cores: {
                core_serial: String,
                flight: Number,
                block: Number,
                reused: Boolean,
                land_success: Boolean,
                landing_type: String,
                landing_vehicle: String
            }[]
        },
        second_stage: {
            payloads: {
                payload_id: String,
                reused: Boolean,
                customers: String[],
                payload_type: String,
                payload_mass_kg: Number,
                payload_mass_lbs: Number,
                orbit: String
            }[]
        }
    },
    reuse: {
        core: Boolean,
        side_core1: Boolean,
        side_core2: Boolean,
        fairings: Boolean,
        capsule: Boolean
    },
    telemetry: {
        flight_club: String
    },
    launch_site: {
        site_id: String,
        site_name: String,
        site_name_long: String
    },
    launch_success: Boolean,
    links: {
        mission_patch: String,
        mission_patch_small: String,
        reddit_campaign: String,
        reddit_launch: String,
        reddit_recovery: String,
        reddit_media: String,
        presskit: String,
        article_link: String,
        video_link: String
    },
    details: String
};
