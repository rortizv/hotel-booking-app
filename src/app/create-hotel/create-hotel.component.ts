import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
  hotelForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private hotelService: HotelService,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.hotelForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      rooms: this.formBuilder.array([], [this.validateRooms])
    });
  }

  validateRooms(control: AbstractControl): { [key: string]: any } | null {
    const roomsArray = control as FormArray;
    if (roomsArray && roomsArray.length === 0) {
      return { noRooms: true };
    }
    return null;
  }

  createHotel() {
    if (this.hotelForm.valid) {
      console.log();

      this.hotelService.createHotel(this.hotelForm.value)
        .subscribe((newHotel) => {
          console.log(newHotel);
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
      location: ['', Validators.required]
    });

    const roomsArray = this.hotelForm.get('rooms') as FormArray;
    roomsArray.push(roomGroup);
  }

  getRoomControls() {
    return (this.hotelForm.get('rooms') as FormArray).controls;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
