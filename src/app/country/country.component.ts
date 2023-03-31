import { Component, OnInit } from '@angular/core'
import { Country } from '../model/country-model'
import { randomFromArray } from '../../common/randomize.helper'
import { PlayersService } from '../players.service'
import data from '../../assets/flagues/countries.td.json'
import { QuestionDataService } from '../question-data.service'
import { PlayerForFamiliada } from '../players/players.component'
import { InputAnswerModel } from '../model/footballgames-model'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'
import { formatStrings } from '../../common/string.helper'

export class Question {
  id: number = 0
  questionName: string = ''
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [TimerService],
})
export class CountryComponent implements OnInit {
  private subscription: Subscription | any
  public actualPlayer: PlayerForFamiliada | any = null
  public countries: Country[] = []
  public answersForCountries: InputAnswerModel[] = []
  public countryForQuestion: Country | any = {}
  public continentForQuestion: string | any = ''
  public blockedButton = false
  public isVisible = false
  public isModalVisible = false
  public showMessage: boolean = false
  public letterForCountriesQuestions: string | any = ''
  public question: any
  public answer = ''
  public inputAnswer: string | undefined = ''
  public correct = 0
  public players: PlayerForFamiliada[] = []
  public tip = ''
  public photos = data
  public questions: Question[] = [
    { id: 2, questionName: 'Wymień wszystkie kraje z ' },
    { id: 3, questionName: 'Wymień wszystkie stolice z ' },
    { id: 4, questionName: 'Wymień kraje na literę ' },
    { id: 5, questionName: 'Wymień stolice na literę ' },
  ]

  public length = 0
  public country: string | undefined = ''
  public points = 0
  public successMessage = 'Już było!'
  public winner: PlayerForFamiliada | any = null

  constructor(
    private questionDataService: QuestionDataService,
    public playerService: PlayersService,
    public timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.getQuestion()
  }

  setPlayersForFamiliada() {
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
    let playerIndex = this.players.findIndex((el) => el.id === this.playerService.actualPlayer)
    this.setActualPlayer(this.players[playerIndex])
  }

  setWinner() {
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
    this.winner = this.players[0]
    this.blockedButton = true
    this.isVisible = true
    this.showAnswer()
  }

  getQuestion(): void {
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.setWrong()
        this.nextPlayer()
        this.timerService.timeout = false
      }
    })
    this.setPlayersForFamiliada()
    this.points = 5
    this.question = randomFromArray(this.questions)
    this.countries = this.questionDataService.getCountries('allCountries')
    this.getData(this.question.id)
  }

  getCountryForLetter(letter: string) {
    const tmp = [...this.countries.filter((country) => country.name[0] === letter)]
    tmp.forEach((country) => {
      this.answersForCountries.push({
        inputAnswer: country.name,
        display: false,
      })
    })
  }

  getCapitalsForLetter(letter: string) {
    const tmp = [...this.countries.filter((country) => country.capital[0] === letter)]
    tmp.forEach((country) => {
      this.answersForCountries.push({
        inputAnswer: country.capital,
        display: false,
      })
    })
  }

  getCountryForContinent(continent: string) {
    const tmp = [...this.countries.filter((country) => country.continent === continent)]
    tmp.forEach((country) => {
      this.answersForCountries.push({
        inputAnswer: country.name,
        display: false,
      })
    })
  }

  getCapitalsForContinent(continent: string) {
    const tmp = [...this.countries.filter((country) => country.continent === continent)]
    tmp.forEach((country) => {
      this.answersForCountries.push({
        inputAnswer: country.capital,
        display: false,
      })
    })
  }

  getData(type: number) {
    if (type === 0) {
      this.countryForQuestion = this.questionDataService.getCountries('countriesForFlags')
      if (this.countryForQuestion?.errorCode) {
        console.log(`ErrorModel: ${typeof this.countryForQuestion} error: ${JSON.stringify(this.countryForQuestion)}`)
        this.getQuestion()
      } else {
        this.tip = this.countryForQuestion.code
        this.answer = this.countryForQuestion.name
      }
    }
    if (type === 1) {
      this.countryForQuestion = this.questionDataService.getCountries('countriesForCapitals')
      if (this.countryForQuestion?.errorCode) {
        console.log(`ErrorModel: ${typeof this.countryForQuestion} error: ${JSON.stringify(this.countryForQuestion)}`)
        this.getQuestion()
      } else {
        this.tip = this.countryForQuestion.name
        this.answer = this.countryForQuestion.capital
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

  save() {
    const input = document.getElementById('userAnswer') as HTMLInputElement
    const value = input.value
    if (input != null) {
      let tmp = this.answersForCountries.findIndex((el) => formatStrings(el.inputAnswer) === formatStrings(value))
      if (tmp !== -1) {
        if (!this.answersForCountries[tmp].display) {
          this.answersForCountries[tmp].display = true
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

  setActualPlayer(player: PlayerForFamiliada) {
    this.actualPlayer = player
  }

  nextPlayer() {
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

  setWrong() {
    this.actualPlayer.wrong++
    const audio = new Audio('../../assets/mp3/1z10zle.mp3')
    audio.play()
    audio.playbackRate = 1.2
  }

  changeMessage(text: string | undefined) {
    this.showMessage = !this.showMessage
    this.successMessage = text + ' już było'
    setTimeout(() => (this.showMessage = !this.showMessage), 1000)
  }

  setTip(text: string) {
    this.tip = text
  }

  setAnswer(answer: string) {
    this.answer = answer
  }

  close() {
    this.isVisible = false
    this.isModalVisible = false
    this.question = ''
    this.winner = null
    this.blockedButton = false
    this.countryForQuestion = {}
    this.answersForCountries.forEach((answer) => {
      answer.display = false
    })
    this.answersForCountries = []
    this.answer = ''
    this.playerService.nextPlayer()
    this.correct = 0
    this.length = 0
    this.playerService.setModal(false)
    this.timerService.timeout = false
    this.subscription.unsubscribe()
    this.getQuestion()
  }

  showAnswer() {
    this.isVisible = true
    this.blockedButton = true
    if (this.answersForCountries.length > 0) {
      this.answersForCountries.forEach((answer) => {
        answer.display = true
      })
    }
  }
}
