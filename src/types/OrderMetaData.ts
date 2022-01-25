export interface OrderMetaData {
  cart_parameters: {
    [key: string]: string
  }, 
  note_attributes: string[],
  notes: string,
  tags: string[]
}