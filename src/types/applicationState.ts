import { Address } from "./Address";
import { Customer } from "./Customer";
import { Discount } from "./Discount";
import { LineItems } from "./LineItem";
import { OrderMetaData } from "./OrderMetaData";
import { Payment } from "./Payment";
import { Shipping } from "./Shipping";
import { Tax } from "./Tax";

export interface ApplicationState {
  customer: Customer | null,
  addresses: {
    shipping: Address | null,
    billing: Address | null
  }, 
  lineItems: LineItems[],
  shipping: Shipping | null,
  taxes: Tax[], 
  discounts: Discount[],
  payments: Payment[],
  orderTotal: number,
  orderMetaData: OrderMetaData | null
}