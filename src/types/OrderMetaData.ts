export interface OrderMetaData {
  cartParameters: {
    [key: string]: string
  }, 
  noteAttributes: string[],
  notes: string,
  tags: string[]
}