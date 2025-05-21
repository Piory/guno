import { Tables } from '../types';

export class SuiteUser {
  constructor(readonly vUserDetail: Tables<'v_user_details'>) {}
}
