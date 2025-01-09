import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ClubCrestsComponent } from './club-crests.component'

describe('ClubCrestsComponent', () => {
  let component: ClubCrestsComponent
  let fixture: ComponentFixture<ClubCrestsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClubCrestsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ClubCrestsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
