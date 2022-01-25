import { OrderState } from "./enums/OrderState";

export interface OrderInfo {
  orderStatus: OrderState,
  billingSameAsShipping: boolean
};