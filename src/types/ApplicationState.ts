import { Address } from "./Address";
import { Customer } from "./Customer";
import { Discount } from "./Discount";
import { LineItemDetails } from "./LineItemDetails";
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
  line_items: LineItemDetails[],
  shipping: Shipping | null,
  taxes: Tax[], 
  discounts: Discount[],
  payments: Payment[],
  order_total: number,
  order_meta_data: OrderMetaData | null
};