import { Injectable } from '@angular/core';
import youtubeSongData from "../assets/youTube/youtubeSongs.json";
import youtubeSerialsIntroData from "../assets/youTube/youtubeSerialsIntros.json";
import youtubeMundialData from "../assets/youTube/youtubeMundialSongs.json"
import {getAndDeleteRandomElementFromArray} from "../common/randomize.helper";
import {YoutubeModel} from "./model/youtube-model";
import famousPeopleData from "../assets/photos/famousPeopleForCategory.json";
import multipleChoiceData from "../assets/multipleChoice/multipleChoice.json"
import buildingsData from "../assets/photos/buildings.json";
import {PhotoModel} from "./model/photo-model";
import moviesData from "../assets/movies/movies.json";
import allMoviesHeroData from "../assets/movies/moviesHero.json"
import allSerialsHeroData from "../assets/movies/serialsHero.json"
import serialsData from "../assets/movies/serials.json";
import movieActors from "../assets/actors/movieActors.json";
import directorsData from "../assets/movies/directors.json"
import familiadaData from "../assets/familiada/familiada.json"
import serialActors from "../assets/actors/serialActors.json";
import gamesData from "../assets/games/games.json";
import allDistricts from "../assets/poland/citiesPL.json";
import allFootballData from "../assets/football/football.json"
import allStadiums from "../assets/stadions/stadions.json";
import allProverbs from "../assets/proverbs/proverbs.json";
import allHistory from "../assets/history/history.json";
import {DescriptionModel} from "./model/description-model";
import {Country} from "./model/country-model";
import countriesData from "../assets/countries/country.json";
import continentsData from "../assets/countries/continents.json";
import lettersData from "../assets/letters.json";
import chemicalElements from "../assets/chemist/chemist.json";
import biologyData from "../assets/biology/biology.json";
import godsData from "../assets/gods/gods.json";
import clubCrestsData from "../assets/clubs/clubCrests.json";
import clubHistoryData from "../assets/clubs/clubsHistory.json";
import {ClubHistory} from "./model/clubHistory-model";
import {ActorModel} from "./model/actor-model";
import {TipsModel} from "./model/tips-model";
import {QuestionMultipleChoice} from "./model/question-model";
import {FamiliadaModel} from "./model/familiada-model";



@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {
  public allFamiliadaData: FamiliadaModel[] = []
  public allYoutubeSongs: YoutubeModel[] = []
  public allYoutubeSerialIntros: YoutubeModel[] = []
  public allYoutubeMundial: YoutubeModel[] = []
  public allFamousPeople: PhotoModel[] = []
  public allBuilding: PhotoModel[] = []
  public allMovies: DescriptionModel[] = []
  public allSerials: DescriptionModel[] = []
  public allMoviesHero: TipsModel[] = []
  public allSerialsHero: TipsModel[] = []
  public allDirectorsData: TipsModel[] = []
  public allGames: DescriptionModel[] = []
  public allBiology: DescriptionModel[] = []
  public allDisctricts: DescriptionModel[] = []
  public allStadiums: DescriptionModel[] = []
  public allProverbs: DescriptionModel[] = []
  public allFootball: DescriptionModel[] = []
  public allMultipleChoice: QuestionMultipleChoice[] = []
  public allHistory: DescriptionModel[] = []
  public allGods:DescriptionModel[] = []
  public allCountries: Country[] = []
  public allMoviesActors: ActorModel[] = []
  public allSerialsActors: ActorModel[] = []
  public allClubsHistoryQuestion: ClubHistory[] = []
  public allChemicalElements: DescriptionModel[] = []
  public countriesForFlags: Country[] | any = null
  public countriesForCapitals: Country[] | any = null
  public continentsForCountries: string[] | any = []
  public continentsForCapitals: string[] | any = []
  public countriesLetters: string[] | any = null
  public capitalsLetters: string[] | any = null
  public allClubsCrests: string[] = []
  public init = false

  constructor() { }

  initial(){
    console.log('initial sdasdas')
    this.allYoutubeSongs = youtubeSongData
    this.allYoutubeMundial = youtubeMundialData
    this.allClubsCrests = clubCrestsData
    this.allYoutubeSerialIntros = youtubeSerialsIntroData
    this.allFamousPeople = famousPeopleData
    this.allBuilding = buildingsData
    this.allMovies = moviesData
    this.allMoviesHero = allMoviesHeroData
    this.allSerialsHero = allSerialsHeroData
    this.allSerials = serialsData
    this.allGames = gamesData
    this.allBiology = biologyData
    this.allMultipleChoice = multipleChoiceData
    this.allFootball = allFootballData
    this.allMoviesActors = movieActors
    this.allGods = godsData
    this.allSerialsActors = serialActors
    this.allDisctricts = allDistricts
    this.allDirectorsData = directorsData
    this.allStadiums = allStadiums
    this.allChemicalElements = chemicalElements
    this.allFamiliadaData = familiadaData
    this.allProverbs = allProverbs
    this.allHistory = allHistory
    this.allClubsHistoryQuestion = clubHistoryData
    this.allCountries = countriesData
    this.countriesForFlags = [...this.allCountries]
    this.countriesForCapitals = [...this.allCountries]
    this.continentsForCountries = continentsData
    this.continentsForCapitals = [...this.continentsForCountries]
    this.countriesLetters = lettersData
    this.capitalsLetters = [...this.countriesLetters]
    this.init = true
  }

  getChemistQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allChemicalElements)
  }

  getMultipleChoiceQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMultipleChoice)
  }

  getMundialQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allYoutubeMundial)
  }

  getFamiliadaQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allFamiliadaData)
  }

  getFootballQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allFootball)
  }

  getDirectorsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allDirectorsData)
  }

  getGodsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allGods)
  }

  getBiologyQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allBiology)
  }

  getYoutubeSongQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allYoutubeSongs)
  }

  getYoutubeSerialsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allYoutubeSerialIntros)
  }

  getFamousPeoplePhotoQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allFamousPeople)
  }

  getBuildingsPhotoQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allBuilding)
  }

  getMoviesDescriptionQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMovies)
  }

  getSerialsDescriptionQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allSerials)
  }

  getGamesDescriptionQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allGames)
  }

  getDistrictsDescriptionQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allDisctricts)
  }

  getStadiumQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allStadiums)
  }

  getProverbQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allProverbs)
  }

  getHistoryQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allHistory)
  }

  getMoviesHeroQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMoviesHero)
  }

  getSerialsHeroQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allSerialsHero)
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

  getClubCrestsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allClubsCrests)
  }

  getClubHistoryQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allClubsHistoryQuestion)
  }

  getSerialsActorsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allSerialsActors)
  }

  getMoviesActorsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMoviesActors)
  }
}
