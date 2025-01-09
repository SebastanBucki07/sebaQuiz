import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BackgroundSoundComponent } from './background-sound.component'

describe('BackgroundSoundComponent', () => {
  let component: BackgroundSoundComponent
  let fixture: ComponentFixture<BackgroundSoundComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackgroundSoundComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BackgroundSoundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
