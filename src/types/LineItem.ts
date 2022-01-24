import { Discount } from "./Discount";
import { Fee } from "./Fee";
import { ProductData } from "./ProductData";
import { Tax } from "./Tax";

export interface LineItems{
  productData: ProductData,
  taxes: Tax[],
  fees: Fee[],
  discounts: Discount[], 
  fulfilledQuantity: number
}