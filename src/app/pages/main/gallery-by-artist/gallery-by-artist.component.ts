import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-by-artist',
  templateUrl: './gallery-by-artist.component.html',
  styleUrl: './gallery-by-artist.component.scss'
})
export class GalleryByArtistComponent {

  @Input() artist: any;
  @Input() closeModal!: () => void;


}
