import { Merchant } from '../Merchant';
import { Order } from '../order/Order';
import { ActorType } from './ActorType';
import { OrderEventType } from './OrderEventType';



export class OrderEvent{

  constructor(partial?: Partial<OrderEvent>) {
    Object.assign(this, partial || {});
  }


  id!: string;


  orderId!: string;

  order!: Order;
  merchant!: Merchant;


  type!: OrderEventType;


  actorType!: ActorType;


  timestamp!: Date;


  toValue?: string;


  fromValue?: string;


  actorId?: string;
}
