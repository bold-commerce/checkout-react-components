import { Address } from "./Address";

export interface Customer {
  platform_id: string,
  public_id: string,
  first_name: string,
  last_name: string,
  email_address: string,
  accepts_marketing: boolean,
  saved_addresses: Address[],
} 