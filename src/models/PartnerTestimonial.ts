import {
    IsString,
    IsUUID,
    MaxLength
} from 'class-validator';


export class PartnerTestimonial {
  static readonly MAX_IMAGE_SIZE: number = 1024 * 1024 * 5;

  constructor(partial?: Partial<PartnerTestimonial>) {
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;


  @IsString()
  @MaxLength(255)
  imageURL?: string;


  @IsString()
  @MaxLength(255)
  testimonial!: string;


  @IsString()
  @MaxLength(255)
  company!: string;


  @IsString()
  @MaxLength(255)
  contact!: string;


  @IsString()
  @MaxLength(255)
  businessURL!: string;


  @IsUUID()
  partnerId!: string;
}
