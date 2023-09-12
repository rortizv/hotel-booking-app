import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hotel, Room } from '../interface/hotel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
  hotel: Hotel | undefined;
  hotelForm!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private hotelService: HotelService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildForm();
    this.hotel = this.hotelService.getSelectedHotel();
    this.hotelForm.reset();
    if (this.hotel) {
      this.hotelService.isCreatingHotel = false;
      this.hotelForm.patchValue(this.hotel);
      this.populateForm(this.hotel);
    } else {
      this.hotelService.isCreatingHotel = true;
      this.hotelForm.get('state')?.setValidators(null);
      this.hotelForm.get('state')?.updateValueAndValidity();
    }
  }

  buildForm() {
    this.hotelForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      rooms: this.formBuilder.array([]),
      state: [true, Validators.required]
    });
  }

  validateRooms(control: AbstractControl): { [key: string]: any } | null {
    const roomsArray = control as FormArray;
    if (roomsArray && roomsArray.length === 0) {
      return { noRooms: true };
    }
    return null;
  }

  fireAction() {
    if (this.hotelService.isCreatingHotel) {
      this.createHotel();
    } else {
      this.updateHotel();
    }
  }

  updateHotel() {
    if (this.hotelForm.valid) {
      this.isLoading = true;

      this.hotelService.updateHotel(this.hotelForm.value)
        .subscribe((updatedHotel) => {
          this.isLoading = false;
          this.openSnackBar('Hotel updated successfully', 'OK');
          this.hotelForm.reset();
        });
    }
  }

  createHotel() {
    if (this.hotelForm.valid) {
      this.isLoading = true;

      this.hotelService.createHotel(this.hotelForm.value)
        .subscribe((newHotel) => {
          this.isLoading = false;
          this.openSnackBar('Hotel created successfully', 'OK');
          this.hotelForm.reset();
        });
    }
  }

  addRoom() {
    const roomGroup = this.formBuilder.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
      price: [0, Validators.required],
      tax: [0, Validators.required],
      location: ['', Validators.required],
      state: [true, Validators.required]
    });

    const roomsArray = this.hotelForm.get('rooms') as FormArray;
    roomsArray.push(roomGroup);
    console.log(this.hotelForm);
  }

  getRoomControls() {
    return (this.hotelForm.get('rooms') as FormArray).controls;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  deleteRoom(index: number) {
    const roomsArray = this.hotelForm.get('rooms') as FormArray;
    roomsArray.removeAt(index);
  }

  populateForm(selectedHotel: Hotel) {
    this.hotelForm.patchValue({
      name: selectedHotel.name,
      location: selectedHotel.location,
    });

    this.populateRooms(selectedHotel.rooms);
  }

  populateRooms(roomsData: any[]) {
    const roomsArray = this.hotelForm.get('rooms') as FormArray;

    while (roomsArray.length > 0) {
      roomsArray.removeAt(0);
    }

    roomsData.forEach((room) => {
      roomsArray.push(
        this.formBuilder.group({
          id: [room.id, Validators.required],
          type: [room.type, Validators.required],
          price: [room.price, Validators.required],
          tax: [room.tax, Validators.required],
          location: [room.location, Validators.required],
          state: [room.state, Validators.required]
        })
      );
    });
  }

  goBack() {
    this.resetForm();
    this.router.navigate(['/dashboard']);
  }

  resetForm() {
    const emptyRooms: FormGroup[] = [];
    for (const room of this.getRoomControls()) {
      emptyRooms.push(this.formBuilder.group({
        id: [''],
        type: [''],
        price: [0],
        tax: [0],
        location: ['']
      }));
    }

    const roomsArray = this.hotelForm.get('rooms') as FormArray;
    while (roomsArray.length) {
      roomsArray.removeAt(0);
    }

    emptyRooms.forEach((room) => {
      roomsArray.push(room);
    });

    this.hotelForm.setValue({
      name: '',
      location: '',
      rooms: roomsArray.value,
      state: true
    });

    this.hotelForm.reset({
      name: '',
      location: '',
      rooms: [],
      state: true,
    });

  }

}
