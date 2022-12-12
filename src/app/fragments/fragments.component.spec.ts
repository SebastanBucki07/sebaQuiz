import { ComponentFixture, TestBed } from '@angular/core/testing';

import {BooksComponent, SongsComponent} from './fragments.component';

describe('SongsComponent', () => {
  let component: SongsComponent;
  let fixture: ComponentFixture<SongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
