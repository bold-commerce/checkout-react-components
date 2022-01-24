import { CountryInfo } from "./CountryInfo";
import { SupportedLanguages } from "./SupportedLanguages";

export interface InitialData {
  shopName: string,
  countryInfo: CountryInfo[],
  supportedLanguages: SupportedLanguages[],
}