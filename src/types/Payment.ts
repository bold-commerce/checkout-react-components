export interface Payment {
  gateway_public_id: string,
  amount: number,
  currency: string,
  type: string,
  display_string: string,
  id: string,
  token: string,
  retain: boolean
}