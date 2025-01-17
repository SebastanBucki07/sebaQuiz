import { Component, OnInit } from '@angular/core'
import { Country } from '../model/country-model'
import { randomFromArray } from '../../common/randomize.helper'
import { PlayersService } from '../players.service'
import data from '../../assets/flags/countries.td.json'
import { QuestionDataService } from '../question-data.service'
import { PlayerForFamiliada } from '../players/players.component'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'
import { formatStrings } from '../../common/string.helper'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'
import { InputAnswerModel } from '../model/football-games-model'

export class Question {
  id = 0
  questionName = ''
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [TimerService],
})
export class CountryComponent implements OnInit {
  private subscription: Subscription | any
  protected actualPlayer: PlayerForFamiliada | any = null
  protected countries: Country[] = []
  protected answersForCountries: InputAnswerModel[] = []
  protected countryForQuestion: Country | any = {}
  protected continentForQuestion: string | any = ''
  protected blockedButton = false
  protected isVisible = false
  protected letterForCountriesQuestions: string | any = ''
  protected question: any
  protected inputAnswer: string | undefined = ''
  protected correct = 0
  protected players: PlayerForFamiliada[] = []
  protected tip = ''
  protected photos = data
  protected questions: Question[] = [
    { id: 2, questionName: 'Wymień wszystkie kraje z ' },
    { id: 3, questionName: 'Wymień wszystkie stolice z ' },
    { id: 4, questionName: 'Wymień kraje na literę ' },
    { id: 5, questionName: 'Wymień stolice na literę ' },
  ]

  protected length = 0
  protected country: string | undefined = ''
  protected points = 0
  protected winner: PlayerForFamiliada | any = null

  constructor(
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    protected playerService: PlayersService,
    public timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.getQuestion()
  }

  setPlayersForFamiliada(): void {
    if (this.players.length >= 1) {
      this.players = []
    }
    const playersList = this.playerService.getPlayers()
    playersList.forEach((player) => {
      this.players.push({
        id: player.id,
        name: player.name,
        wrong: 0,
      })
    })
    const playerIndex = this.players.findIndex((player) => player.id === this.playerService.actualPlayer)
    this.setActualPlayer(this.players[playerIndex])
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

  getQuestion(): void {
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBoolean().subscribe((x) => {
      if (x) {
        this.setWrong()
        this.nextPlayer()
        this.timerService.timeout = false
      }
    })
    this.setPlayersForFamiliada()
    this.questionAnswerService.setPointsForQuestion(5)
    this.question = randomFromArray(this.questions)
    this.countries = this.questionDataService.getCountries('allCountries')
    this.getData(this.question.id)
  }

  getCountryForLetter(letter: string): void {
    const countriesForLetter = [...this.countries.filter((country) => country.name[0] === letter)]
    countriesForLetter.forEach((country) => {
      this.answersForCountries.push({
        inputAnswer: country.name,
        display: false,
      })
    })
  }

  getCapitalsForLetter(letter: string): void {
    const capitalsForLetter = [...this.countries.filter((country) => country.capital[0] === letter)]
    capitalsForLetter.forEach((country) => {
      this.answersForCountries.push({
        inputAnswer: country.capital,
        display: false,
      })
    })
  }

  getCountryForContinent(continent: string): void {
    const countryForContinent = [...this.countries.filter((country) => country.continent === continent)]
    countryForContinent.forEach((country) => {
      this.answersForCountries.push({
        inputAnswer: country.name,
        display: false,
      })
    })
  }

  getCapitalsForContinent(continent: string): void {
    const capitalsForContinent = [...this.countries.filter((country) => country.continent === continent)]
    capitalsForContinent.forEach((country) => {
      this.answersForCountries.push({
        inputAnswer: country.capital,
        display: false,
      })
    })
  }

  getData(type: number): void {
    if (type === 0) {
      this.countryForQuestion = this.questionDataService.getCountries('countriesForFlags')
      if (this.countryForQuestion?.errorCode) {
        console.log(`ErrorModel: ${typeof this.countryForQuestion} error: ${JSON.stringify(this.countryForQuestion)}`)
        this.getQuestion()
      } else {
        this.tip = this.countryForQuestion.code
        this.questionAnswerService.setAnswer(this.countryForQuestion.name)
      }
    }
    if (type === 1) {
      this.countryForQuestion = this.questionDataService.getCountries('countriesForCapitals')
      if (this.countryForQuestion?.errorCode) {
        console.log(`ErrorModel: ${typeof this.countryForQuestion} error: ${JSON.stringify(this.countryForQuestion)}`)
        this.getQuestion()
      } else {
        this.tip = this.countryForQuestion.name
        this.questionAnswerService.setAnswer(this.countryForQuestion.capital)
      }
    }
    if (type === 2) {
      this.continentForQuestion = this.questionDataService.getCountries('continentsForCountries')
      if (this.continentForQuestion?.errorCode) {
        console.log(
          `ErrorModel: ${typeof this.continentForQuestion} error: ${JSON.stringify(this.continentForQuestion)}`
        )
        this.getQuestion()
      } else {
        this.getCountryForContinent(this.continentForQuestion)
        this.tip = this.continentForQuestion
      }
    }
    if (type === 3) {
      this.continentForQuestion = this.questionDataService.getCountries('continentsForCapitals')
      if (this.continentForQuestion?.errorCode) {
        console.log(
          `ErrorModel: ${typeof this.continentForQuestion} error: ${JSON.stringify(this.continentForQuestion)}`
        )
        this.getQuestion()
      } else {
        this.getCapitalsForContinent(this.continentForQuestion)
        this.tip = this.continentForQuestion
      }
    }
    if (type === 4) {
      this.letterForCountriesQuestions = this.questionDataService.getCountries('countriesLetters')
      if (this.letterForCountriesQuestions?.errorCode) {
        console.log(
          `ErrorModel: ${typeof this.letterForCountriesQuestions} error: ${JSON.stringify(
            this.letterForCountriesQuestions
          )}`
        )
        this.getQuestion()
      } else {
        this.getCountryForLetter(this.letterForCountriesQuestions)
        this.tip = this.letterForCountriesQuestions
      }
    }
    if (type === 5) {
      this.letterForCountriesQuestions = this.questionDataService.getCountries('capitalsLetters')
      if (this.letterForCountriesQuestions?.errorCode) {
        console.log(
          `ErrorModel: ${typeof this.letterForCountriesQuestions} error: ${JSON.stringify(
            this.letterForCountriesQuestions
          )}`
        )
        this.getQuestion()
      } else {
        this.getCapitalsForLetter(this.letterForCountriesQuestions)
        this.tip = this.letterForCountriesQuestions
      }
    }
  }

  save(): void {
    const input = document.getElementById('userAnswer') as HTMLInputElement
    const value = input.value
    if (input) {
      const playerAnswer = this.answersForCountries.findIndex(
        (answer) => formatStrings(answer.inputAnswer) === formatStrings(value)
      )
      if (playerAnswer !== -1) {
        if (!this.answersForCountries[playerAnswer].display) {
          this.answersForCountries[playerAnswer].display = true
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

  setWrong(): void {
    this.actualPlayer.wrong++
    const audio = new Audio('../../assets/mp3/1z10zle.mp3')
    audio.play()
    audio.playbackRate = 1.2
  }

  close(): void {
    this.isVisible = false
    this.question = ''
    this.winner = null
    this.blockedButton = false
    this.countryForQuestion = {}
    this.answersForCountries.forEach((answer) => {
      answer.display = false
    })
    this.answersForCountries = []
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
    this.correct = 0
    this.length = 0
    this.timerService.timeout = false
    this.subscription.unsubscribe()

    //this.getQuestion()
  }

  showAnswer(): void {
    this.isVisible = true
    this.blockedButton = true
    if (this.answersForCountries.length > 0) {
      this.answersForCountries.forEach((answer) => {
        answer.display = true
      })
    }
  }
}
