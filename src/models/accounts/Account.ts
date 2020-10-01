import { IsString, IsUUID, MaxLength } from 'class-validator';


export class Account {

  constructor(initial?: Partial<Account>) {
    Object.assign(this, initial);
  }


  @IsUUID()
  id!: string;


  @MaxLength(255)
  @IsString()
  name!: string;


  createdAt!: Date;


  updatedAt!: Date;


  deletedAt!: Date;

}
