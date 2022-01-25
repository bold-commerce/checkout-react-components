import { Discount } from "./Discount";
import { ShippingLines } from "./ShippingLines";
import { Tax } from "./Tax";

export interface Shipping {
  selected_shipping_line: ShippingLines | null, 
  available_shipping_lines: ShippingLines[], 
  taxes: Tax[],
  discounts: Discount[]
};