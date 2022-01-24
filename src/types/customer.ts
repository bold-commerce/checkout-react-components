import { Address } from "./Address";

export interface Customer {
  platformId: string,
  publicId: string,
  firstName: string,
  lastName: string,
  emailAddress: string,
  acceptsMarketing: boolean,
  savedAddresses: Address[],
} 