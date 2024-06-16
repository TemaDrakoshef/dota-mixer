/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $HeroOut = {
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
    type: 'any-of',
    contains: [{
    type: 'string',
}, {
    type: 'null',
}],
},
        icon: {
    type: 'any-of',
    contains: [{
    type: 'string',
}, {
    type: 'null',
}],
},
    },
} as const;
