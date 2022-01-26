import { ProvinceInfo } from "./ProvinceInfo";

export interface CountryInfo {
  iso_code: string,
  name: string,
  province_label: string,
  provinces: ProvinceInfo[],
  show_postal_code: boolean,
  show_province: boolean
}
