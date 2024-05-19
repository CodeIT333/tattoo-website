import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArtistUser } from '../../shared/models/ArtistUser';
import { Message } from '../../shared/models/Message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})

export class BookingComponent{

  @Input() artistInput?: ArtistUser;

  bookingForm = this.createForm({
    name: '',
    email: '',
    phone: '',
    artist: '',
    tattoo_place: '',
    tattoo_size: 0,
    message: '',
    file: ''
  });

  artists: ArtistUser[] = [
    { email: "dillion.forte@gmail.com", name: 'Dillon Forte', roles: 'Color Realistic Black', profile_image_url: 'assets/artists/Dillon Forte.jpg', images: [] },
    { email: "cam.tunlog@gmail.com", name: 'Cam Tunlog', roles: 'Color Black', profile_image_url: 'assets/artists/Cam Tunlog.jpg', images: [] },
    { email: "hygee.skinart@gmail.com", name: 'Hygee Skinart', roles: 'Geometric Minimal Black', profile_image_url: 'assets/artists/Hygee Skinart.jpg', images: [] },
    { email: "geum.taena@gmail.com", name: 'Geum Taena', roles: 'Linework Color Ornamentica', profile_image_url: 'assets/artists/Geum Taena.jpg', images: [] },
  ];

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const artistName = params['artist'];
      if (artistName) {
        this.bookingForm.patchValue({ artist: artistName });
      }
    });
  }


  createForm(model: Message) {
    let formGroup = this.fb.group(model);
    formGroup.get('name')?.addValidators([Validators.required]);
    formGroup.get('email')?.addValidators([Validators.required, Validators.email]);
    formGroup.get('phone')?.addValidators([Validators.required]); // make more rules
    formGroup.get('artist')?.addValidators([Validators.required]);
    formGroup.get('tattoo_place')?.addValidators([Validators.required]);
    formGroup.get('tattoo_size')?.addValidators([Validators.required]);
    formGroup.get('message')?.addValidators([Validators.required, Validators.minLength(20), Validators.maxLength(300)]);
    
    return formGroup;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  sendMessage() {
    // send an email to the actual artist
    if(this.bookingForm.valid) {
      // ...
    }
  }
}
