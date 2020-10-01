import { IsDate, IsString, IsUUID, MaxLength } from 'class-validator';


export class OAuthStash {

  constructor(partial?: Partial<OAuthStash>) {
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;


  @IsString()
  @MaxLength(255)
  data!: string;


  @IsDate()
  expires!: Date;
}
