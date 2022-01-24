export interface SupportedLanguages {
  createdAt: string, //TODO datetime
  deletedAt: string //TODO datetime
  enabled: boolean,
  id: number,
  isoLanguage: string,
  isDefault: boolean,
  languageName: string,
  languageBlob: string,
  name: string,
  outOfDate: string,
  shopId: number,
  shopLanguageId: string,
  source: any, //TODO not sure
  updatedAt: string, //TODO datetime
}