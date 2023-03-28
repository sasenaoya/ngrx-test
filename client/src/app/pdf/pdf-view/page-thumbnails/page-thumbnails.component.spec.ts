import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageThumbnailsComponent } from './page-thumbnails.component';

describe('PageThumbnailsComponent', () => {
  let component: PageThumbnailsComponent;
  let fixture: ComponentFixture<PageThumbnailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageThumbnailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
