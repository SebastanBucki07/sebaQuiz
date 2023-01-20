import {Component, OnInit} from '@angular/core';
import {Country} from "../model/country-model";
import {randomFromArray} from "../../common/randomize.helper";
import {PlayersService} from "../players.service";
import data from "../../assets/flagues/countries.td.json"
import {QuestionDataService} from "../question-data.service";
import {TimerService} from "../timer.service";

export class Question {
  id: number = 0;
  questionName: string = ''
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  public countries: Country[] = [];
  public answersForCountries: Country[] = [];
  public countryForQuestion: Country | any = {};
  public continentForQuestion: string | any = "";
  public isVisible = false;
  public isModalVisible = false;
  public showMessage: boolean = false;
  public letterForCountriesQuestions: string | any = ""
  public question: any
  public answer: string = ''
  public correct:number = 0
  public tip: string = ''
  public photos = data
  public multiply = 1
  public questions: Question[] = [
    {id: 2, questionName: 'Wymień wszystkie kraje z '},
    {id: 3, questionName: 'Wymień wszystkie stolice z '},
    {id: 4, questionName: 'Wymień kraje na literę '},
    {id: 5, questionName: 'Wymień stolice na literę '}
  ];

  public length: number = 0;
  public country: string | undefined = '';
  public points: number = 0;
  public successMessage: string = 'Już było!';


  constructor(
    private questionDataService: QuestionDataService,
    private timerService: TimerService,
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
        this.setMultiply(1)
        break
      case 'Ameryka Południowa':
        this.setMultiply(1)
        break
      case 'Ameryka Północna':
        this.setMultiply(1)
        break
      case 'Australia i Oceania':
        this.setMultiply(2)
        break
      case 'Azja':
        this.setMultiply(1)
        break
    }
  }

  getQuestion(): void {
    this.question = randomFromArray(this.questions)
    this.points=0
    this.countries = this.questionDataService.getCountries('allCountries')
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
      this.timerService.setTimer(1)
      this.countryForQuestion = this.questionDataService.getCountries('countriesForFlags')
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
      this.timerService.setTimer(1)
      this.countryForQuestion = this.questionDataService.getCountries('countriesForCapitals')
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
      this.timerService.setTimer(1)
      this.setMultiplyForContinent(this.continentForQuestion)
      this.timerService.setTimer(3)
      this.continentForQuestion = this.questionDataService.getCountries('continentsForCountries')
      if (this.continentForQuestion?.errorCode) {
        console.log(`ErrorModel: ${typeof (this.continentForQuestion)} error: ${JSON.stringify(this.continentForQuestion)}`)
        this.getQuestion()
      } else {
        this.getCountryForContinent(this.continentForQuestion)
        this.tip = this.continentForQuestion
      }
    }
    if (type === 3) {
      this.timerService.setTimer(3)
      this.continentForQuestion = this.questionDataService.getCountries('continentsForCapitals')
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
      this.timerService.setTimer(3)
      this.letterForCountriesQuestions = this.questionDataService.getCountries('countriesLetters')
      if (this.letterForCountriesQuestions?.errorCode) {
        console.log(`ErrorModel: ${typeof (this.letterForCountriesQuestions)} error: ${JSON.stringify(this.letterForCountriesQuestions)}`)
        this.getQuestion()
      } else {
        this.getCountryForLetter(this.letterForCountriesQuestions)
        this.tip = this.letterForCountriesQuestions
      }
    }
    if (type === 5) {
      this.timerService.setTimer(3)
      this.letterForCountriesQuestions = this.questionDataService.getCountries('capitalsLetters')
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
        this.correct++
        this.country = ''
      } else {
        this.changeMessage(tmp2)
      }
    }
  }

  countPoints(correct:number,allAnswers:number){
    let percent = (correct/allAnswers) * 100
    if (percent === 100){
      this.points = 10*this.multiply
    }
    else if ((percent < 100) && (percent>=80)){
      this.points = 8*this.multiply
    }
    else if ((percent < 80) && (percent>=60)){
      this.points = 6*this.multiply
    }
    else if ((percent < 60) && (percent>=40)){
      this.points = 4*this.multiply
    }
    else if ((percent < 40) && (percent>=20)){
      this.points = 2*this.multiply
    }
    else if ((percent < 20) && (percent>0)){
      this.points = this.multiply
    }
    else{
      this.points = 0
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
    this.correct = 0
    this.length = 0
    this.multiply = 1
    this.playerService.setModal(false);
    this.getQuestion()
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
    if (this.answersForCountries.length > 0) {
      this.countPoints(this.correct,this.length)
      this.answersForCountries.forEach((answer) => {
        answer.display = true
      })
    }

  }
}
