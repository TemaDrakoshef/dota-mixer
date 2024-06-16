/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $HeroStatsOut = {
    properties: {
        id: {
    type: 'number',
    isRequired: true,
},
        name: {
    type: 'string',
    isRequired: true,
},
        localized_name: {
    type: 'string',
    isRequired: true,
},
        primary_attr: {
    type: 'string',
    isRequired: true,
},
        attack_type: {
    type: 'AttackType',
    isRequired: true,
},
        roles: {
    type: 'array',
    contains: {
        type: 'Role',
    },
    isRequired: true,
},
        legs: {
    type: 'number',
    isRequired: true,
},
        img: {
    type: 'string',
    isRequired: true,
},
        icon: {
    type: 'string',
    isRequired: true,
},
        base_health: {
    type: 'number',
    isRequired: true,
},
        base_health_regen: {
    type: 'number',
    isRequired: true,
},
        base_mana: {
    type: 'number',
    isRequired: true,
},
        base_mana_regen: {
    type: 'number',
    isRequired: true,
},
        base_armor: {
    type: 'number',
    isRequired: true,
},
        base_mr: {
    type: 'number',
    isRequired: true,
},
        base_attack_min: {
    type: 'number',
    isRequired: true,
},
        base_attack_max: {
    type: 'number',
    isRequired: true,
},
        base_str: {
    type: 'number',
    isRequired: true,
},
        base_agi: {
    type: 'number',
    isRequired: true,
},
        base_int: {
    type: 'number',
    isRequired: true,
},
        str_gain: {
    type: 'number',
    isRequired: true,
},
        agi_gain: {
    type: 'number',
    isRequired: true,
},
        int_gain: {
    type: 'number',
    isRequired: true,
},
        attack_range: {
    type: 'number',
    isRequired: true,
},
        projectile_speed: {
    type: 'number',
    isRequired: true,
},
        attack_rate: {
    type: 'number',
    isRequired: true,
},
        base_attack_time: {
    type: 'number',
    isRequired: true,
},
        attack_point: {
    type: 'number',
    isRequired: true,
},
        move_speed: {
    type: 'number',
    isRequired: true,
},
        turn_rate: {
    type: 'any-of',
    contains: [{
    type: 'number',
}, {
    type: 'null',
}],
},
        cm_enabled: {
    type: 'number',
    isRequired: true,
},
        day_vision: {
    type: 'number',
    isRequired: true,
},
        night_vision: {
    type: 'number',
    isRequired: true,
},
        turbo_picks: {
    type: 'any-of',
    contains: [{
    type: 'number',
}, {
    type: 'number',
}, {
    type: 'null',
}],
},
        turbo_picks_trend: {
    type: 'any-of',
    contains: [{
    type: 'array',
    contains: {
    type: 'number',
},
}, {
    type: 'null',
}],
},
        turbo_wins: {
    type: 'any-of',
    contains: [{
    type: 'number',
}, {
    type: 'null',
}],
},
        turbo_wins_trend: {
    type: 'any-of',
    contains: [{
    type: 'array',
    contains: {
    type: 'number',
},
}, {
    type: 'null',
}],
},
        pro_pick: {
    type: 'any-of',
    contains: [{
    type: 'number',
}, {
    type: 'null',
}],
},
        pro_win: {
    type: 'any-of',
    contains: [{
    type: 'number',
}, {
    type: 'null',
}],
},
        pro_ban: {
    type: 'any-of',
    contains: [{
    type: 'number',
}, {
    type: 'null',
}],
},
        pub_pick: {
    type: 'any-of',
    contains: [{
    type: 'number',
}, {
    type: 'null',
}],
},
        pub_pick_trend: {
    type: 'any-of',
    contains: [{
    type: 'array',
    contains: {
    type: 'number',
},
}, {
    type: 'null',
}],
},
        pub_win: {
    type: 'any-of',
    contains: [{
    type: 'number',
}, {
    type: 'null',
}],
},
        pub_win_trend: {
    type: 'any-of',
    contains: [{
    type: 'array',
    contains: {
    type: 'number',
},
}, {
    type: 'null',
}],
},
    },
} as const;
