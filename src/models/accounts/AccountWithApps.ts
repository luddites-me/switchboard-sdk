import { Account } from './Account';
import { AppList } from './AppList';

export class AccountWithApps extends Account {
  apps!: AppList;
}
