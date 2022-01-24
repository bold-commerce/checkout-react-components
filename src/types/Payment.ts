export interface Payment {
  gatewayPublicId: string,
  amount: number,
  currency: string,
  type: string,
  displayString: string,
  id: string,
  token: string,
  retain: boolean
}