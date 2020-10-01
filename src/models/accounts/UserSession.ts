import { AccountWithApps } from './AccountWithApps';
import { BaseUserInfo } from './BaseUserInfo';

export class UserSession extends BaseUserInfo {
  account!: AccountWithApps;
}
