import { Component, OnInit } from '@angular/core'
import { PlayersService } from '../players.service'
import { TimerService } from '../timer.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  selector: 'app-add-points',
  templateUrl: './add-points.component.html',
  styleUrls: ['./add-points.component.css'],
})
export class AddPointsComponent implements OnInit {
  protected isDisabled = false
  protected winnerId = 0
  protected points = 0
  protected timeout = false

  constructor(
    private playerService: PlayersService,
    public timerService: TimerService,
    protected questionAndAnswerService: QuestionAndAnswerService
  ) {}

  ngOnInit(): void {
    this.setWinnerId()
    this.getPointsForQuestion()
    this.getTimeout()
  }

  protected setDisableButton(disabled: boolean) {
    this.isDisabled = disabled
  }

  protected addPointsForPlayer() {
    this.playerService.addPoints(this.winnerId, this.points)
  }

  private setWinnerId() {
    this.winnerId = this.questionAndAnswerService.getWinnerId()
  }

  private getPointsForQuestion() {
    this.points = this.questionAndAnswerService.getPointsForQuestion()
  }

  private getTimeout() {
    this.timeout = this.timerService.timeout
  }
}
