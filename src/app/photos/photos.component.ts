import {Component, OnInit} from '@angular/core';
import {PlayersService} from "../players.service";
import {PhotoModel} from "../model/photo-model";
import {QuestionDataService} from "../question-data.service";

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
  public answer: string = ''

  constructor(
    public questionDataService: QuestionDataService,
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
      default: {
        break;
      }
    }
    this.tip = this.random1.photo
    this.answer = this.random1.name
    this.isModalVisible = true;
  }

  close() {
    this.isVisible = false;
    this.isModalVisible = false
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
