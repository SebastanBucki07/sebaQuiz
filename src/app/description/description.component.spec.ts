import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  DistrictsComponent,
  GamesComponent, HistoryComponent,
  MoviesComponent, ProverbsComponent,
  SerialsComponent, StadiumsComponent
} from './description.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('SerialsComponent', () => {
  let component: SerialsComponent;
  let fixture: ComponentFixture<SerialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialsComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SerialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('DistrictsComponent', () => {
  let component: DistrictsComponent;
  let fixture: ComponentFixture<DistrictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictsComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('StadiumsComponent', () => {
  let component: StadiumsComponent;
  let fixture: ComponentFixture<StadiumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StadiumsComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StadiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('ProverbsComponent', () => {
  let component: ProverbsComponent;
  let fixture: ComponentFixture<ProverbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProverbsComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProverbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
