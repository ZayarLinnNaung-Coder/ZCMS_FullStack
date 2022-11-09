import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypeDetailsComponent } from './content-type-details.component';

describe('ContentTypeDetailsComponent', () => {
  let component: ContentTypeDetailsComponent;
  let fixture: ComponentFixture<ContentTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentTypeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
