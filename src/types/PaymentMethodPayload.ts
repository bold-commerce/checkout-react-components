import { GatewayName } from "./enums";

export interface PaymentMethodPayload {
  index: number,
  gatewayName: GatewayName
}