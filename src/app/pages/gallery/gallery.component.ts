import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../shared/services/gallery.service';
import { Image } from  '../../shared/models/Image';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {


  galleryObject?: Array<Image>;


  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    
  }

  

}
