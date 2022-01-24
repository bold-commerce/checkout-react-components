import { ShippingLines } from "./ShippingLines";

export interface Shipping {
  selectedShippingLine: ShippingLines | null, 
  availableShippingLines: ShippingLines[], 
  taxes?: any, //TODO oneof??
  discounts?: any //TODO oneof??
}