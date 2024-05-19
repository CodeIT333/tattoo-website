import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryByArtistComponent } from './gallery-by-artist.component';

describe('GalleryByArtistComponent', () => {
  let component: GalleryByArtistComponent;
  let fixture: ComponentFixture<GalleryByArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryByArtistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryByArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
