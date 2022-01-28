import { Discount } from "./Discount";
import { ShippingLine as ShippingLine } from "./ShippingLine";
import { Tax } from "./Tax";

export interface Shipping {
  selected_shipping: ShippingLine | null, 
  available_shipping_lines: ShippingLine[], 
  taxes: Tax[],
  discounts: Discount[]
};