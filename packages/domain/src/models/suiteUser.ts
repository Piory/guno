import { Database, Tables } from '../types';

export class SuiteUser {
  constructor(private readonly vUserDetail: Tables<'v_user_details'>) {}
}
