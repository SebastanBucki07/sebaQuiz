import { Component, OnInit } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { YoutubeModel } from '../model/youtube-model'
import { PlayersService } from '../players.service'
import { QuestionDataService } from '../question-data.service'

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
})
export abstract class YoutubeComponent {
  public random1: YoutubeModel | any = {}
  public points = 2
  public question = ''
  public isTitleVisible = false
  public isNotSerial = true
  public isAuthorVisible = false
  public category = ''
  public answerDescription = 'Tytuł:'
  public tip = ''
  public title = ''
  public author = ''
  public urlSafe: SafeResourceUrl = ''

  constructor(
    public questionDataService: QuestionDataService,
    public playerService: PlayersService,
    public sanitizer: DomSanitizer
  ) {}

  init() {
    this.getQuestion()
  }

  getQuestion() {
    switch (this.category) {
      case 'song': {
        this.random1 = this.questionDataService.getYoutubeSongQuestion()
        this.question = 'Podaj tytuł oraz wykonawcę'
        this.points = 2
        break
      }
      case 'opening': {
        this.random1 = this.questionDataService.getYoutubeSerialsQuestion()
        this.question = 'Podaj tytuł serialu'
        this.points = 2
        this.isNotSerial = false
        break
      }
      case 'mundial': {
        this.random1 = this.questionDataService.getMundialQuestion()
        this.question = 'W jakiej imprezie sportowej ta piosenka była głowną?'
        this.points = 2
        this.isNotSerial = false
        this.answerDescription = 'Impreza:'
        break
      }
      default: {
        break
      }
    }
    this.tip = this.random1.url
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.tip)
    this.title = this.random1.title
    this.author = this.random1.author
  }

  close() {
    this.isAuthorVisible = false
    this.isTitleVisible = false
    this.title = ''
    this.author = ''
    this.isNotSerial = true
    this.answerDescription = 'Tytuł'
    this.playerService.nextPlayer()
    this.init()
    this.playerService.setModal(false)
  }

  showTitle() {
    this.isTitleVisible = !this.isTitleVisible
  }
  showAuthor() {
    this.isAuthorVisible = !this.isAuthorVisible
  }
}

@Component({
  selector: 'app-song-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
})
export class YoutubeSongComponent extends YoutubeComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'song'
    this.init()
  }
}

@Component({
  selector: 'app-serials-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
})
export class YoutubeSerialsComponent extends YoutubeComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'opening'
    this.init()
  }
}
@Component({
  selector: 'app-mundial-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
})
export class YoutubeMundialComponent extends YoutubeComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'mundial'
    this.init()
  }
}
