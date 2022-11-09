import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAssetsPopupComponent } from './add-new-assets-popup.component';

describe('AddNewAssetsPopupComponent', () => {
  let component: AddNewAssetsPopupComponent;
  let fixture: ComponentFixture<AddNewAssetsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAssetsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewAssetsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
