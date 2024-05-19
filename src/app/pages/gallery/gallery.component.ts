import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../shared/services/gallery.service';
import { Image } from  '../../shared/models/Image';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {


  images: Array<{ url: string, artist_name?: string }> = [];

  loading = false;


  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.galleryService.loadAll().subscribe(images => {
      if (images) {
        images.forEach(image => {
          this.galleryService.loadImageUrl(image.image_url).subscribe(url => {
            this.images.push({ url: url, artist_name: image.artist_name });
          });
        });
      }
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  

}
