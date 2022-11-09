import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypeBuilderComponent } from './content-type-builder.component';

describe('ContentTypeBuilderComponent', () => {
  let component: ContentTypeBuilderComponent;
  let fixture: ComponentFixture<ContentTypeBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentTypeBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentTypeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
