import {
    IsString,
    IsUUID,
    MaxLength
} from 'class-validator';


export class PartnerShowcase {
  static readonly MAX_IMAGE_SIZE: number = 1024 * 1024 * 5;

  constructor(partial?: Partial<PartnerShowcase>) {
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;


  @IsString()
  @MaxLength(255)
  imageURL?: string;


  @IsString()
  @MaxLength(255)
  title!: string;


  @IsString()
  @MaxLength(255)
  caption!: string;


  @IsUUID()
  partnerId!: string;
}
