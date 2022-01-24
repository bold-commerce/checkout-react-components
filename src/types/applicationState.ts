import { Address } from "./Address";
import { Customer } from "./Customer";
import { LineItems } from "./LineItem";

export interface ApplicationState {
  customer: Customer | null,
  addresses: {
    shipping: Address | null,
    billing: Address | null
  }, 
  lineItems: LineItems[],
  shipping: any, //TODO
  taxes: any, //TODO
  discounts: any, //TODO
  payments: any, //TODO
  orderTotal: number,
  orderMetaData: any //TODO
}