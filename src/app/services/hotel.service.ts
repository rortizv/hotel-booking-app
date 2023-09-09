import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = 'https://fce2d01e-3751-4704-af6f-7c5dcb67fd57.mock.pstmn.io';

  constructor(private http: HttpClient) {}

  createHotel(hotelData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-hotel`, hotelData);
  }

}
