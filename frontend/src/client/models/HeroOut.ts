/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AttackType } from './AttackType';
import type { Role } from './Role';

export type HeroOut = {
  id: number
  name: string
  localized_name: string
  primary_attr: string
  attack_type: AttackType
  roles: Array<Role>
  legs: number
  img?: string
  icon?: string | null
}
