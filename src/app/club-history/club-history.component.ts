import { Component, OnInit } from '@angular/core'
import { ClubHistory } from '../model/clubHistory-model'
import { PlayersService } from '../players.service'
import { QuestionDataService } from '../question-data.service'
import { TimerService } from '../timer.service'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  selector: 'app-club-history',
  templateUrl: './club-history.component.html',
  styleUrls: ['./club-history.component.css'],
  providers: [TimerService],
})
export class ClubHistoryComponent implements OnInit {
  protected randomFootballer: ClubHistory | any = {}
  protected isVisible = false
  protected tip = ''
  protected photos: any = []

  constructor(
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    protected playerService: PlayersService,
    public timerService: TimerService
  ) {}

  init(): void {
    this.timerService.setTimer(0.5)
    this.randomFootballer = this.questionDataService.getClubHistoryQuestion()
    this.questionAnswerService.setAnswer(this.randomFootballer.osoba)
    this.questionAnswerService.setPointsForQuestion(3)
    this.tip = this.randomFootballer.narodowosc
    if (this.randomFootballer.klub1 != '-') {
      this.photos.push(this.randomFootballer.klub1)
    }
    if (this.randomFootballer.klub2 != '-') {
      this.photos.push(this.randomFootballer.klub2)
    }
    if (this.randomFootballer.klub3 != '-') {
      this.photos.push(this.randomFootballer.klub3)
    }
    if (this.randomFootballer.klub4 != '-') {
      this.photos.push(this.randomFootballer.klub4)
    }
    if (this.randomFootballer.klub5 != '-') {
      this.photos.push(this.randomFootballer.klub5)
    }
  }

  ngOnInit(): void {
    this.init()
  }

  close(): void {
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
    this.questionAnswerService.setTip('')
  }
}
