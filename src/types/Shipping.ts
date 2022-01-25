import { ShippingLines } from "./ShippingLines";

export interface Shipping {
  selected_shipping_line: ShippingLines | null, 
  available_shipping_lines: ShippingLines[], 
  taxes?: any, //TODO oneof??
  discounts?: any //TODO oneof??
}