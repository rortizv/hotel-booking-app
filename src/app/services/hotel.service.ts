import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../interface/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = 'https://fce2d01e-3751-4704-af6f-7c5dcb67fd57.mock.pstmn.io';
  public selectedHotel: any;
  public isCreatingHotel = false;
  public response = {
    "count": 3,
    "results": [
      {
        "uuid": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        "name": "Hotel Ibiza",
        "location": "Ibiza, Spain",
        "state": true,
        "rooms": [
          {
            "id": "101",
            "type": "single",
            "price": 100,
            "tax": 10,
            "location": "1st floor",
            "state": true
          },
          {
            "id": "303",
            "type": "single",
            "price": 500,
            "tax": 10,
            "location": "Main hall",
            "state": false
          }
        ]
      },
      {
        "uuid": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "name": "El viajero",
        "location": "Cartagena, Colombia",
        "state": true,
        "rooms": [
          {
            "id": "2002",
            "type": "double",
            "price": 200,
            "tax": 5,
            "location": "balcony",
            "state": true
          }
        ]
      },
      {
        "uuid": "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
        "name": "Magdalena Real",
        "location": "Santa Marta, Colombia",
        "state": false,
        "rooms": [
          {
            "id": "109",
            "type": "double",
            "price": 180,
            "tax": 9,
            "location": "2nd floor",
            "state": false
          },
          {
            "id": "202",
            "type": "double",
            "price": 220,
            "tax": 5,
            "location": "2nd floor",
            "state": true
          }
        ]
      }
    ]
  }

  constructor(private http: HttpClient) { }

  createHotel(hotelData: Hotel): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-hotel`, hotelData);
  }

  updateHotel(hotelData: Hotel): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-hotel`, hotelData);
  }

  getHotels(hotelId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels/${hotelId}`);
  }

  deleteHotel(hotelId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-hotel/${hotelId}`);
  }

  setSelectedHotel(hotel: Hotel) {
    this.selectedHotel = hotel;
  }

  getSelectedHotel() {
    return this.selectedHotel;
  }

}
