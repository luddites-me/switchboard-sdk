import { IsJSON, IsString, IsUUID, MaxLength } from 'class-validator';
import { AuditObject } from './AuditObject';
import { AuthorizationScope } from './security/AuthorizationScope';


export class Developer extends AuditObject {

  constructor(partial?: Partial<Developer>) {
    super();
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;


  @IsString()
  @MaxLength(255)
  name!: string;


  @IsJSON()
  scopes!: AuthorizationScope[];

}
