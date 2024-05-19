import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../shared/services/gallery.service';
import { NavigationEnd, Router } from '@angular/router';
import { ArtistUser } from '../../shared/models/ArtistUser';
import { forkJoin } from 'rxjs';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  artists: ArtistUser[] = [
    { email: "dillion.forte@gmail.com", name: 'Dillon Forte', roles: 'Color Realistic Black', profile_image_url: 'assets/artists/Dillon Forte.jpg', images: [] },
    { email: "cam.tunlog@gmail.com", name: 'Cam Tunlog', roles: 'Color Black', profile_image_url: 'assets/artists/Cam Tunlog.jpg', images: [] },
    { email: "hygee.skinart@gmail.com", name: 'Hygee Skinart', roles: 'Geometric Minimal Black', profile_image_url: 'assets/artists/Hygee Skinart.jpg', images: [] },
    { email: "geum.taena@gmail.com", name: 'Geum Taena', roles: 'Linework Color Ornamentica', profile_image_url: 'assets/artists/Geum Taena.jpg', images: [] },
  ];

  introducingText: string = "We don't do your tattoo in a place where people come to work thinking it's another hateful Monday. Our profession and our life is your happiness and satisfaction, we work every day, inch by inch, to make sure that at the end of the day, you have a smile on your face that is ear to ear with happiness. A cheerful, youthful team and excellent facilities await you."

  studioImageUrl: string = "assets/studio.jpg"

  selectedArtist: ArtistUser | null = null;

  loading = false;


  constructor(private galleryService: GalleryService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }

  openArtistGalleryModal(artist: ArtistUser) {
    this.loading = true;

    // find the artist
    const artistIndex = this.artists.findIndex(a => a.name === artist.name);
    if (artistIndex !== -1) {
      this.selectedArtist = this.artists[artistIndex];

      // the imgages already loaded
      if (this.selectedArtist.images.length > 0) {
        this.loading = false;
      } else {
        this.galleryService.loadImagesByArtistName(artist.name).subscribe(images => {
          if (images) {
            const imageLoaders = images.map(image =>
              this.galleryService.loadImageUrl(image.image_url)
            );

            // w8 for all images
            forkJoin(imageLoaders).subscribe(urls => {
              this.selectedArtist!.images = urls;
              this.loading = false;
            }, error => {
              console.error(error);
              this.loading = false;
            });
          } else {
            this.loading = false;
          }
        }, error => {
          console.error(error);
          this.loading = false;
        });
      }
    } else {
      this.loading = false;
    }
  }


  closeArtistGalleryModal = () => {
    this.selectedArtist = null;
  }

  navigateToBooking(artist_name?: string) {
    const queryParams = artist_name ? { artist: artist_name } : {};
    this.router.navigate(['/booking'], {queryParams});
  }
}
