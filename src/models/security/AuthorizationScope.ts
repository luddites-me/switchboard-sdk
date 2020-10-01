import { AuthPermission } from './AuthPermission';
import { AuthResource } from './AuthResource';

export class AuthorizationScope {
  resource!: AuthResource;
  permissions!: AuthPermission[];
}
