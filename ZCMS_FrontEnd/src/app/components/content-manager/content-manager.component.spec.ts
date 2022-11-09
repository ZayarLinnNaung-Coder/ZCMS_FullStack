import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerComponent } from './content-manager.component';

describe('ContentManagerComponent', () => {
  let component: ContentManagerComponent;
  let fixture: ComponentFixture<ContentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
