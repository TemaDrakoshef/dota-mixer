/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AttackType } from './AttackType';
import type { Role } from './Role';

export type HeroStatsOut = {
    id: number;
    name: string;
    localized_name: string;
    primary_attr: string;
    attack_type: AttackType;
    roles: Array<Role>;
    legs: number;
    img: string;
    icon: string;
    base_health: number;
    base_health_regen: number;
    base_mana: number;
    base_mana_regen: number;
    base_armor: number;
    base_mr: number;
    base_attack_min: number;
    base_attack_max: number;
    base_str: number;
    base_agi: number;
    base_int: number;
    str_gain: number;
    agi_gain: number;
    int_gain: number;
    attack_range: number;
    projectile_speed: number;
    attack_rate: number;
    base_attack_time: number;
    attack_point: number;
    move_speed: number;
    turn_rate?: (number | null);
    cm_enabled: number;
    day_vision: number;
    night_vision: number;
    turbo_picks?: (number | null);
    turbo_picks_trend?: (Array<number> | null);
    turbo_wins?: (number | null);
    turbo_wins_trend?: (Array<number> | null);
    pro_pick?: (number | null);
    pro_win?: (number | null);
    pro_ban?: (number | null);
    pub_pick?: (number | null);
    pub_pick_trend?: (Array<number> | null);
    pub_win?: (number | null);
    pub_win_trend?: (Array<number> | null);
};
