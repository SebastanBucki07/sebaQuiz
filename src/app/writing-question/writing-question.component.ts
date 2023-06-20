import { Component, OnInit } from '@angular/core'
import { QuestionDataService } from '../question-data.service'
import { PlayersService } from '../players.service'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'
import { InputAnswerModel } from '../model/footballgames-model'
import { PlayerForFamiliada } from '../players/players.component'
import { formatStrings } from '../../common/string.helper'
import { WrittingData } from '../model/writtingsCategory-model'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  template: '',
  providers: [TimerService],
})
export abstract class WritingQuestionComponent {
  private subscription: Subscription | any
  protected writingQuestion: WrittingData | any = {}
  protected answerForSquad: InputAnswerModel[] = []
  protected question = ''
  protected tip = ''
  protected inputAnswer: string | undefined = ''
  protected category = ''
  protected players: PlayerForFamiliada[] = []
  protected actualPlayer: PlayerForFamiliada | any = null
  protected blockedButton = false
  protected isVisible = false
  protected end = false
  protected winner: PlayerForFamiliada | any = null

  constructor(
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    protected playerService: PlayersService,
    public timerService: TimerService
  ) {}

  init(): void {
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.setWrong()
        this.nextPlayer()
        this.timerService.timeout = false
      }
    })
    this.getQuestion()
  }

  setPlayersForFamiliada(): void {
    if (this.players.length >= 1) {
      this.players = []
    }
    const tmp = this.playerService.getPlayers()
    tmp.forEach((player) => {
      this.players.push({
        id: player.id,
        name: player.name,
        wrong: 0,
      })
    })
    const playerIndex = this.players.findIndex((el) => el.id === this.playerService.actualPlayer)
    this.setActualPlayer(this.players[playerIndex])
  }

  setActualPlayer(player: PlayerForFamiliada): void {
    this.actualPlayer = player
  }

  nextPlayer(): void {
    this.timerService.setTimer(0.5)
    const indexofActualPlayer = this.players.indexOf(this.actualPlayer, 0)
    let nextPlayer = {}
    if (indexofActualPlayer + 1 === this.players.length) {
      nextPlayer = this.players[0]
    } else {
      nextPlayer = this.players[this.players.indexOf(this.actualPlayer) + 1]
    }
    if (this.actualPlayer.wrong >= 3) {
      const index = this.players.indexOf(this.actualPlayer, 0)
      if (index > -1) {
        this.players.splice(index, 1)
      }
    }
    if (this.players.length === 1) {
      this.setWinner()
      this.showAnswer()
    } else {
      this.actualPlayer = nextPlayer
    }
  }

  getQuestion(): void {
    switch (this.category) {
      case 'football': {
        this.writingQuestion = this.questionDataService.getWritingsFootballCategoryDataQuestion()
        break
      }
      case 'rest': {
        this.writingQuestion = this.questionDataService.getWritingsCategoryDataQuestion()
        break
      }
      default: {
        break
      }
    }
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.setWrong()
        this.nextPlayer()
        this.timerService.timeout = false
      }
    })
    this.question = `Wypisz ${this.writingQuestion.category}`
    this.setPlayersForFamiliada()
    this.questionAnswerService.setPointsForQuestion(3)
    this.setAnswerForSquads()
    this.question = `Wypisz ${this.writingQuestion[0].category}`
    this.isVisible = false
  }

  setAnswerForSquads(): void {
    this.writingQuestion.forEach((answer: WrittingData) => {
      this.answerForSquad.push({
        inputAnswer: answer.name,
        display: false,
      })
    })
  }

  close(): void {
    this.question = ''
    this.winner = null
    this.writingQuestion = {}
    this.answerForSquad = []
    this.blockedButton = false
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
    this.timerService.timeout = false
    this.subscription.unsubscribe()
    this.playerService.nextPlayer()
  }

  setWinner(): void {
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
    this.winner = this.players[0]
    this.blockedButton = true
    this.isVisible = true
    this.showAnswer()
    this.questionAnswerService.setWinner(this.winner.id)
  }

  showAnswer(): void {
    if (this.answerForSquad.length > 0) {
      this.answerForSquad.forEach((answer) => {
        answer.display = true
      })
    }
    this.isVisible = true
    this.blockedButton = true
  }

  save(): void {
    const input = document.getElementById('userAnswer') as HTMLInputElement
    const value = input?.value
    if (input != null) {
      const tmp = this.answerForSquad.findIndex((el) => formatStrings(el.inputAnswer) === formatStrings(value))
      if (tmp !== -1) {
        if (!this.answerForSquad[tmp].display) {
          this.answerForSquad[tmp].display = true
          this.inputAnswer = ''
          const audio = new Audio('../../assets/mp3/1z10dobrzee.mp3')
          audio.play()
          audio.playbackRate = 1
        } else {
          this.setWrong()
        }
      } else {
        this.setWrong()
      }
      this.inputAnswer = ''
      this.nextPlayer()
    }
  }

  setWrong(): void {
    this.actualPlayer.wrong++
    const audio = new Audio('../../assets/mp3/1z10zle.mp3')
    audio.play()
    audio.playbackRate = 1.2
  }
}

@Component({
  selector: 'app-writing-question-football',
  templateUrl: './writing-question.component.html',
  styleUrls: ['./writing-question.component.css'],
})
export class WritingQuestionFootballComponent extends WritingQuestionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'football'
    this.init()
  }
}

@Component({
  selector: 'app-writing-question-rest',
  templateUrl: './writing-question.component.html',
  styleUrls: ['./writing-question.component.css'],
})
export class WritingQuestionRestComponent extends WritingQuestionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'rest'
    this.init()
  }
}
