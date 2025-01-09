import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FamousPeopleComponent, PhotosComponent } from './photos.component'

describe('PhotosComponent', () => {
  let component: PhotosComponent
  let fixture: ComponentFixture<PhotosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotosComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FamousPeopleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
