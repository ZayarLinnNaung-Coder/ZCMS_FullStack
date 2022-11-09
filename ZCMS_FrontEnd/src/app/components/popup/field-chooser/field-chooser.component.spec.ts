import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldChooserComponent } from './field-chooser.component';

describe('FieldChooserComponent', () => {
  let component: FieldChooserComponent;
  let fixture: ComponentFixture<FieldChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
