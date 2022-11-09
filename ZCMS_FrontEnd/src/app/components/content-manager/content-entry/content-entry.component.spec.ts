import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEntryComponent } from './content-entry.component';

describe('ContentEntryComponent', () => {
  let component: ContentEntryComponent;
  let fixture: ComponentFixture<ContentEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
