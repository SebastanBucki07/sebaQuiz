import { ComponentFixture, TestBed } from '@angular/core/testing'

import { YoutubeSerialsComponent, YoutubeSongComponent } from './youtube.component'

describe('YoutubeSongComponent', () => {
  let component: YoutubeSongComponent
  let fixture: ComponentFixture<YoutubeSongComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YoutubeSongComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(YoutubeSongComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

describe('YoutubeSerialsComponent', () => {
  let component: YoutubeSerialsComponent
  let fixture: ComponentFixture<YoutubeSerialsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YoutubeSerialsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(YoutubeSerialsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
