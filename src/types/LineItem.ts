import { Discount } from "./Discount";
import { Fee } from "./Fee";
import { ProductData } from "./ProductData";
import { Tax } from "./Tax";

export interface LineItems{
  product_data: ProductData,
  taxes: Tax[],
  fees: Fee[],
  discounts: Discount[], 
  fulfilled_quantity: number
};