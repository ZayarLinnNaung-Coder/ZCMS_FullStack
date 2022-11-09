import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaLibraryPopupComponent } from './media-library-popup.component';

describe('MediaLibraryPopupComponent', () => {
  let component: MediaLibraryPopupComponent;
  let fixture: ComponentFixture<MediaLibraryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaLibraryPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaLibraryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
