import { Component, OnInit } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { YoutubeModel } from '../model/youtube-model'
import { PlayersService } from '../players.service'
import { QuestionDataService } from '../question-data.service'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  template: '',
})
export abstract class YoutubeComponent {
  protected randomYoutube: YoutubeModel | any = {}
  protected question = ''
  protected isTitleVisible = false
  protected isNotSerial = true
  protected isAuthorVisible = false
  protected category = ''
  protected answerDescription = 'Tytuł:'
  protected tip = ''
  protected title = ''
  protected author = ''
  protected urlSafe: SafeResourceUrl = ''

  constructor(
    protected questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    protected playerService: PlayersService,
    protected sanitizer: DomSanitizer
  ) {}

  init(): void {
    this.getQuestion()
  }

  getQuestion(): void {
    switch (this.category) {
      case 'song': {
        this.randomYoutube = this.questionDataService.getYoutubeSongQuestion()
        this.question = 'Podaj tytuł oraz wykonawcę'
        break
      }
      case 'opening': {
        this.randomYoutube = this.questionDataService.getYoutubeSerialsQuestion()
        this.question = 'Podaj tytuł serialu'
        this.isNotSerial = false
        break
      }
      case 'event': {
        this.randomYoutube = this.questionDataService.getYoutubeEventQuestion()
        this.question = 'W jakiej imprezie sportowej ta piosenka była głowną?'
        this.isNotSerial = false
        this.answerDescription = 'Impreza:'
        break
      }
      default: {
        break
      }
    }
    this.questionAnswerService.setPointsForQuestion(2)
    this.tip = this.randomYoutube.url
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.tip)
    this.title = this.randomYoutube.title
    this.author = this.randomYoutube.author
  }

  close(): void {
    this.isAuthorVisible = false
    this.isTitleVisible = false
    this.title = ''
    this.author = ''
    this.isNotSerial = true
    this.answerDescription = 'Tytuł'
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
  }

  showTitle(): void {
    this.isTitleVisible = !this.isTitleVisible
    this.questionAnswerService.setPointsForQuestion(2)
  }

  showAuthor(): void {
    this.isAuthorVisible = !this.isAuthorVisible
    this.questionAnswerService.setPointsForQuestion(4)
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
    this.category = 'event'
    this.init()
  }
}
