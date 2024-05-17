import { TestBed } from '@angular/core/testing';

import { ArtistUserService } from './artist-user.service';

describe('ArtistUserService', () => {
  let service: ArtistUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
