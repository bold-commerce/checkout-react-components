export interface ProductData {
  id: string,
  title: string,
  image_url: string,
  properties: {
    [key: string]: string
  },
  description: string,
  quantity: number,
  price: number,
  total_price: number,
  visible: boolean,
  line_item_key: string,
  barcode: string,
  compare_at_price: number,
  weight: number,
  weight_unit: string,
  product_id: string,
  variant_id: string,
  requires_shipping: string,
  sku: string,
  taxable: boolean,
  tags: string
}