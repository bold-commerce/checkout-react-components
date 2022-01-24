import { CountryInfo } from "./countryInfo";
import { SupportedLanguages } from "./SupportedLanguages";

export interface InitialData {
  shop_name: string,
  country_info: CountryInfo[],
  supported_languages: SupportedLanguages[],
};