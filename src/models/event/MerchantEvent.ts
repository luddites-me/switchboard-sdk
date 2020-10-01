import { Merchant } from '../Merchant';
import { MerchantEventType } from './MerchantEventType';


export class MerchantEvent {

  constructor(partial?: Partial<MerchantEvent>) {
    Object.assign(this, partial || {});
  }

  merchant!: Merchant;
  type!: MerchantEventType;
}
