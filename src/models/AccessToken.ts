import { IsDate, IsUUID } from 'class-validator';
import { SubjectType } from './SubjectType';


export class AccessToken {

  constructor(partialAccessToken?: Partial<AccessToken>) {
    Object.assign(this, partialAccessToken || {});
  }


  @IsUUID()
  id!: string;


  @IsDate()
  expires!: Date;


  subjectId!: string;


  subjectType!: SubjectType;

}
