import { IsDate, IsString, IsUUID } from 'class-validator';


export class Diagnostic {
  constructor(partial?: Partial<Diagnostic>) {
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;


  @IsString()
  instanceId!: string;


  @IsDate()
  timestamp!: Date;


  @IsString()
  buildVersion!: string;


  @IsString()
  environmentName!: string;
}
