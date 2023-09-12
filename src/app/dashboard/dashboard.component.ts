import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HotelService } from '../services/hotel.service';
import { Router } from '@angular/router';
import { Hotel } from '../interface/hotel';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'rooms', 'state', 'actions'];
  hotels: any;
  dataSource: any;

  constructor(private hotelService: HotelService,
              private router: Router) { }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels() {
    // this.hotelService.getHotels()
    // .pipe(
    //   catchError((error) => {
    //     console.error('Error fetching hotels:', error);
    //     return throwError(() => error);
    //   })
    //   )
    //   .subscribe((res: any) => {
    //     this.hotels = res;
    //     this.dataSource = new MatTableDataSource(this.hotels['results']);
    //   });

    this.hotels = this.hotelService.response.results;
    this.dataSource = new MatTableDataSource(this.hotels);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToCreateHotel() {
    this.hotelService.isCreatingHotel = true;
    this.router.navigate(['/create-hotel']);
  }

  goToEditHotel(hotel: Hotel) {
    this.hotelService.isCreatingHotel = false;
    this.hotelService.setSelectedHotel(hotel);
    this.router.navigate(['/create-hotel']);
  }

  deleteHotel(hotelId: any) {
    let hotel = this.hotels.find((hotel: any) => hotel.uuid === hotelId);
    if (hotel) {
      this.hotelService.deleteHotel(hotelId)
        .subscribe((res: any) => {
          console.log(res);
          this.getHotels();
        });
    } else {
      console.log('Hotel not found');
      return;
    }
  }

  changeState(hotel: any) {
    hotel.state = !hotel.state;
  }

}
