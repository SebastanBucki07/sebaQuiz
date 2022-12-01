import {Injectable} from '@angular/core';
import {Country} from "./model/country-model";
import countriesData from "../assets/countries/country.json"
import continentsData from "../assets/countries/continents.json"
import lettersData from "../assets/letters.json"
import {getAndDeleteRandomElementFromArray} from "../common/randomize.helper";

@Injectable({
  providedIn: 'root'
})
export class CountriesQuestionService {
  public allCountries: Country[] = []
  public countriesForFlags: Country[] | any = null
  public countriesForCapitals: Country[] | any = null
  public continentsForCountries: string[] | any = []
  public continentsForCapitals: string[] | any = []
  public countriesLetters: string[] | any = null
  public capitalsLetters: string[] | any = null
  public init: boolean = false

  constructor() {
  }

  initial() {
    this.allCountries = countriesData
    this.countriesForFlags = [...this.allCountries]
    this.countriesForCapitals = [...this.allCountries]
    this.continentsForCountries = continentsData
    this.continentsForCapitals = [...this.continentsForCountries]
    this.countriesLetters = lettersData
    this.capitalsLetters = [...this.countriesLetters]
    this.init = true
  }

  getCountries(question: string): Country[] | string[] | any {
    if (!this.init) {
      this.initial()
    }
    switch (question) {
      case 'allCountries': {
        return this.allCountries
      }
      case 'capitalsLetters': {
        return getAndDeleteRandomElementFromArray(this.capitalsLetters)
      }
      case 'countriesLetters': {
        return getAndDeleteRandomElementFromArray(this.countriesLetters)
      }
      case 'continentsForCountries': {
        return getAndDeleteRandomElementFromArray(this.continentsForCountries)
      }
      case 'continentsForCapitals': {
        return getAndDeleteRandomElementFromArray(this.continentsForCapitals)
      }
      case 'countriesForCapitals': {
        return getAndDeleteRandomElementFromArray(this.countriesForCapitals)
      }
      case 'countriesForFlags': {
        return getAndDeleteRandomElementFromArray(this.countriesForFlags)

      }
      default: {
        break;
      }
    }
  }

  /*putCountries(newArray: Country[] | string[], question: string): Country[] | string[] | any {
    if (!this.init) {
      this.initial()
    }
    switch (question) {
      case 'capitalsLetters': {
        this.capitalsLetters = newArray
        break;
      }
      case 'countriesLetters': {
        this.countriesLetters = newArray
        break;
      }
      case 'continentsForCountries': {
        this.continentsForCountries = newArray
        break;
      }
      case 'continentsForCapitals': {
        this.continentsForCapitals = newArray
        break;
      }
      case 'countriesForCapitals': {
        this.countriesForCapitals = newArray
        break;
      }
      case 'countriesForFlags': {
        return this.countriesForFlags = newArray
      }
      default: {
        break;
      }
    }
  }*/
}
