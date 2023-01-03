import {Component, OnInit} from '@angular/core';
import {PlayersService} from "../players.service";
import {PhotoModel} from "../model/photo-model";
import {QuestionDataService} from "../question-data.service";
import {TimerService} from "../timer.service";

@Component({
  template: ''
})
export abstract class PhotosComponent {
  public random1: PhotoModel | any = {}
  public points: number = 2
  public question: string = ''
  public isVisible = false
  public isModalVisible = false
  public tip: string = ''
  public isFlague = false
  public answer: string = ''

  constructor(
    public questionDataService: QuestionDataService,
    private timerService: TimerService,
    public playerService: PlayersService,
  ) {
  }

  getQuestion(category: string) {
    switch (category) {
      case 'famousPeople': {
        this.random1 = this.questionDataService.getFamousPeoplePhotoQuestion()
        this.question = 'Kim jest osoba ze zdjęcia?'
        this.points = 2
        break
      }
      case 'buildings': {
        this.random1 = this.questionDataService.getBuildingsPhotoQuestion()
        this.question = 'Jak nazywa sie budowla ze zdjęcia?'
        this.points = 2
        break
      }
      case 'flagues': {
        this.random1 = this.questionDataService.getCountries('countriesForFlags');
        this.question = 'Z jakiego kraju jest ta flaga?'
        this.isFlague = true
        this.points = 2
        break
      }
      default: {
        break;
      }
    }
    this.timerService.setTimer(1)
    this.tip = this.random1.photo
    this.answer = this.random1.name
    this.isModalVisible = true;
  }

  close() {
    this.isVisible = false;
    this.isModalVisible = false
    this.isFlague = false
    this.answer = ''
    this.playerService.nextPlayer()
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
  }
}

@Component({
  selector: 'app-famouspeople',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class FamousPeopleComponent extends PhotosComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('famousPeople')
  }
}

@Component({
  selector: 'app-buildings',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class BuildingsComponent extends PhotosComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('buildings')
  }
}

@Component({
  selector: 'app-flagues',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class FlaguesComponent extends PhotosComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('flagues')
  }
}
