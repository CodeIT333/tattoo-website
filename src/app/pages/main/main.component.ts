import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../shared/services/gallery.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  artists = [
    { name: 'Dillon Forte', role: 'Color Realistic Black', imageUrl: 'assets/artists/Dillon Forte.jpg' },
    { name: 'Cam Tunlog', role: 'Color Black', imageUrl: 'assets/artists/Cam Tunlog.jpg' },
    { name: 'Hygee Skinart', role: 'Geometric Minimal Black', imageUrl: 'assets/artists/Hygee Skinart.jpg' },
    { name: 'Geum Taena', role: 'Linework Color Ornamentica', imageUrl: 'assets/artists/Geum Taena.jpg' },
  ];

  introducingText: string = "We don't do your tattoo in a place where people come to work thinking it's another hateful Monday. Our profession and our life is your happiness and satisfaction, we work every day, inch by inch, to make sure that at the end of the day, you have a smile on your face that is ear to ear with happiness. A cheerful, youthful team and excellent facilities await you."

  studioImageUrl: string = "assets/studio.jpg"

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {

  }



}
