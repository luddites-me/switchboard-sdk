import { OrderUpdate } from '..';

export type NamedOrderUpdate = OrderUpdate & { orderName: string };
