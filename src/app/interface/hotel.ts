export interface HotelResponse {
  count: number,
  results: any[]
}

export interface Hotel {
  uuid?: string,
  name: string,
  location: string,
  state: boolean,
  rooms: Room[]
}

export interface Room {
  id?: string,
  type: string,
  price: number,
  tax: number,
  location: string
}
