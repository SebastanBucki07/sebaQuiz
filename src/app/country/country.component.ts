import {Component, OnInit} from '@angular/core';
import {CountriesQuestionService} from "../countries-question.service";
import {Country} from "../model/country-model";
import {randomFromArray} from "../../common/randomize.helper";
import {PlayersService} from "../players.service";

export class Question {
  id: number = 0
  questionName: string = ''
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  public countries: Country[] = [];
  public answersForCountries: Country[] = []
  public countryForQuestion: Country | any = {}
  public continentForQuestion: string | any = ""
  public isVisible = false;
  public isModalVisible = false;
  public showMessage: boolean = false;
  public letterForCountriesQuestions: string | any = ""
  public question: any
  public answer: string = ''
  public tip: string = ''
  public multiply = 1
  public questions: Question[] = [
    {id: 0, questionName: 'Z jakiego kraju jest ta flaga?'},
    {id: 1, questionName: 'Jaka jest stolica kraju '},
    {id: 2, questionName: 'Wymień wszystkie kraje z '},
    {id: 3, questionName: 'Wymień wszystkie stolice z '},
    {id: 4, questionName: 'Wymień kraje na literę '},
    {id: 5, questionName: 'Wymień stolice na literę '}
  ]

  public length: number = 0;
  public country: string | undefined = ''
  public points: number = 0
  public successMessage: string = 'Już było!'


  constructor(
    private countriesQuestionService: CountriesQuestionService,
    public playerService: PlayersService
  ) {
  }

  ngOnInit(): void {
    this.getQuestion()
  }


  setMultiply(multiply: number) {
    this.multiply = multiply
  }

  setMultiplyForContinent(continent: string) {
    switch (continent) {
      case 'Europa':
        this.setMultiply(1)
        break;
      case 'Afryka':
        this.setMultiply(2)
        break
      case 'Ameryka Południowa':
        this.setMultiply(3)
        break
      case 'Ameryka Północna':
        this.setMultiply(3)
        break
      case 'Australia i Oceania':
        this.setMultiply(4)
        break
      case 'Azja':
        this.setMultiply(2)
        break
    }
  }

  getQuestion(): void {
    this.question = randomFromArray(this.questions)
    this.countries = this.countriesQuestionService.getCountries('allCountries')
    this.getData(this.question.id)
    this.isModalVisible = true;
  }

  getCountryForLetter(letter: string) {
    this.answersForCountries = [...this.countries.filter(country => country.name[0] === letter)]
    this.length = this.answersForCountries.length
  }

  getCapitalsForLetter(letter: string) {
    this.answersForCountries = [...this.countries.filter(country => country.capital[0] === letter)]
    this.length = this.answersForCountries.length
  }

  getCountryForContinent(continent: string) {
    this.answersForCountries = [...this.countries.filter(country => country.continent === continent)]
    this.length = this.answersForCountries.length
  }

  getCapitalsForContinent(continent: string) {
    this.answersForCountries = [...this.countries.filter(country => country.continent === continent)]
    this.length = this.answersForCountries.length
  }

  getData(type: number) {
    if (type === 0) {
      this.countryForQuestion = this.countriesQuestionService.getCountries('countriesForFlags')
      if (this.countryForQuestion?.errorCode) {
        console.log(`ErrorModel: ${typeof (this.countryForQuestion)} error: ${JSON.stringify(this.countryForQuestion)}`)
        this.getQuestion()
      } else {
        this.tip = this.countryForQuestion.code
        this.answer = this.countryForQuestion.name
        this.points = 2
      }
    }
    if (type === 1) {
      this.countryForQuestion = this.countriesQuestionService.getCountries('countriesForCapitals')
      if (this.countryForQuestion?.errorCode) {
        console.log(`ErrorModel: ${typeof (this.countryForQuestion)} error: ${JSON.stringify(this.countryForQuestion)}`)
        this.getQuestion()
      } else {
        this.tip = this.countryForQuestion.name
        this.answer = this.countryForQuestion.capital
        this.points = 2
      }
    }
    if (type === 2) {
      this.setMultiplyForContinent(this.continentForQuestion)
      this.continentForQuestion = this.countriesQuestionService.getCountries('continentsForCountries')
      if (this.continentForQuestion?.errorCode) {
        console.log(`ErrorModel: ${typeof (this.continentForQuestion)} error: ${JSON.stringify(this.continentForQuestion)}`)
        this.getQuestion()
      } else {
        this.getCountryForContinent(this.continentForQuestion)
        this.tip = this.continentForQuestion
      }
    }
    if (type === 3) {
      this.continentForQuestion = this.countriesQuestionService.getCountries('continentsForCapitals')
      this.setMultiplyForContinent(this.continentForQuestion)
      if (this.continentForQuestion?.errorCode) {
        console.log(`ErrorModel: ${typeof (this.continentForQuestion)} error: ${JSON.stringify(this.continentForQuestion)}`)
        this.getQuestion()
      } else {
        this.getCapitalsForContinent(this.continentForQuestion)
        this.tip = this.continentForQuestion
      }
    }
    if (type === 4) {
      this.letterForCountriesQuestions = this.countriesQuestionService.getCountries('countriesLetters')
      if (this.letterForCountriesQuestions?.errorCode) {
        console.log(`ErrorModel: ${typeof (this.letterForCountriesQuestions)} error: ${JSON.stringify(this.letterForCountriesQuestions)}`)
        this.getQuestion()
      } else {
        this.getCountryForLetter(this.letterForCountriesQuestions)
        this.tip = this.letterForCountriesQuestions
      }
    }
    if (type === 5) {
      this.letterForCountriesQuestions = this.countriesQuestionService.getCountries('capitalsLetters')
      if (this.letterForCountriesQuestions?.errorCode) {
        console.log(`ErrorModel: ${typeof (this.letterForCountriesQuestions)} error: ${JSON.stringify(this.letterForCountriesQuestions)}`)
        this.getQuestion()
      } else {
        this.getCapitalsForLetter(this.letterForCountriesQuestions)
        this.tip = this.letterForCountriesQuestions
      }
    }

  }

  save(event: any) {
    const tmp2 = event.target.value.toLowerCase()
    let tmp = 0
    this.country = tmp2
    if (document.getElementById(tmp2) && this.answersForCountries !== undefined) {
      if (this.question.id === 4 || this.question.id === 2) {
        tmp = this.answersForCountries.findIndex(el => el.name.toLowerCase() === tmp2)
      }
      if (this.question.id === 5 || this.question.id === 3) {
        tmp = this.answersForCountries.findIndex(el => el.capital.toLowerCase() === tmp2)
      }
      if (!this.answersForCountries[tmp].display) {
        this.answersForCountries[tmp].display = true;
        this.points++
        this.country = ''
      } else {
        this.changeMessage(tmp2)
        //this.country = ''
      }
    }
  }

  changeMessage(text: string | undefined) {
    this.showMessage = !this.showMessage
    this.successMessage = text + ' już było'
    setTimeout(() => this.showMessage = !this.showMessage, 1000);
  }

  setTip(text: string) {
    this.tip = text
  }

  setAnswer(answer: string) {
    this.answer = answer
  }

  close() {
    this.setMultiply(1)
    this.isVisible = false;
    this.isModalVisible = false
    this.question = ''
    this.countryForQuestion = {}
    this.answersForCountries.forEach((answer) => {
      answer.display = false
    })
    this.answersForCountries = []
    this.answer = ''
    this.playerService.nextPlayer()
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
    if (this.answersForCountries.length > 0) {
      this.answersForCountries.forEach((answer) => {
        answer.display = true
      })
    }
  }
}
