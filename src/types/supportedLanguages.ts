export interface SupportedLanguages {
  created_at: string, //TODO datetime
  deleted_at: string //TODO datetime
  enabled: boolean,
  id: number,
  iso_language: string,
  is_default: boolean,
  language_name: string,
  language_blob: string,
  name: string,
  out_of_date: string,
  shop_id: number,
  shop_language_id: string,
  source: any, //TODO not sure
  updated_at: string, //TODO datetime
}