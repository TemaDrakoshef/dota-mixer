/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HeroesOut } from '../models/HeroesOut';
import type { HeroesStatsOut } from '../models/HeroesStatsOut';
import type { HeroStatsOut } from '../models/HeroStatsOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HeroesService {

    /**
     * Read Heroes
     * Retrieve heroes.
     * @returns HeroesOut Successful Response
     * @throws ApiError
     */
    public static readHeroes(): CancelablePromise<HeroesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/heroes/',
        });
    }

    /**
     * Read Hero
     * Get hero by ID.
     * @returns HeroStatsOut Successful Response
     * @throws ApiError
     */
    public static readHero({
heroId,
}: {
heroId: number,
}): CancelablePromise<HeroStatsOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/heroes/{hero_id}',
            path: {
                'hero_id': heroId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Heroes Stats
     * Get heroes stats.
     * @returns HeroesStatsOut Successful Response
     * @throws ApiError
     */
    public static readHeroesStats(): CancelablePromise<HeroesStatsOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/heroes/stats/',
        });
    }

}
